import { EventEmitter } from '@angular/core';
import { BehaviorSubject, skip, take } from 'rxjs';
import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';

declare let google: any;

export interface YoutubeInitOptions {
  /**
   * list of permission scopes to grant in case we request an access token
   */
  scopes?: string | string[];
  /**
   * UX mode to use for the sign-in flow.
   */
  ux_mode?: 'popup' | 'redirect';

  /**
   * Optional, defaults to 'select_account'.
   * A space-delimited, case-sensitive list of prompts to present the
   * user.
   * Possible values are:
   * empty string The user will be prompted only the first time your
   *     app requests access. Cannot be specified with other values.
   * 'none' Do not display any authentication or consent screens. Must
   *     not be specified with other values.
   * 'consent' Prompt the user for consent.
   * 'select_account' Prompt the user to select an account.
   */
  prompt?: '' | 'none' | 'consent' | 'select_account';
}

const defaultInitOptions: YoutubeInitOptions = {
  scopes: ['https://www.googleapis.com/auth/youtube'],
  ux_mode: 'popup',
};

export class YoutubeLoginProvider extends BaseLoginProvider {
  public static readonly PROVIDER_ID: string = 'YOUTUBE';

  public override readonly changeUser = new EventEmitter<SocialUser | null>();

  private readonly _socialUser = new BehaviorSubject<SocialUser | null>(null);
  private readonly _accessToken = new BehaviorSubject<string | null>(null);
  private readonly _receivedAccessToken = new EventEmitter<string | null>();

  // @ts-ignore
  private _tokenClient: google.accounts.oauth2.TokenClient | undefined;

  constructor(private clientId: string, private readonly initOptions?: YoutubeInitOptions) {
    super();

    this.initOptions = { ...defaultInitOptions, ...this.initOptions };

    // emit changeUser events but skip initial value from behaviorSubject
    this._socialUser.pipe(skip(1)).subscribe(this.changeUser);

    // emit receivedAccessToken but skip initial value from behaviorSubject
    this._accessToken.pipe(skip(1)).subscribe(this._receivedAccessToken);
  }

  initialize(autoLogin?: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.loadScript(YoutubeLoginProvider.PROVIDER_ID, 'https://accounts.google.com/gsi/client', () => {
          google.accounts.id.initialize({
            client_id: this.clientId,
            auto_select: autoLogin,
            callback: ({ credential }: any) => this._socialUser.next(this.createSocialUser(credential)),
            ux_mode: this.initOptions?.ux_mode,
          });

          if (this.initOptions?.scopes) {
            const scope =
              this.initOptions.scopes instanceof Array
                ? this.initOptions.scopes.filter((s) => s).join(' ')
                : this.initOptions.scopes;

            this._tokenClient = google.accounts.oauth2.initTokenClient({
              client_id: this.clientId,
              scope,
              prompt: this.initOptions.prompt,
              callback: (tokenResponse: {
                error: any;
                error_description: any;
                error_uri: any;
                access_token: string | null;
              }) => {
                if (tokenResponse.error) {
                  this._accessToken.error({
                    code: tokenResponse.error,
                    description: tokenResponse.error_description,
                    uri: tokenResponse.error_uri,
                  });
                } else {
                  this._accessToken.next(tokenResponse.access_token);
                }
              },
            });
          }

          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  getLoginStatus(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      if (this._socialUser.value) {
        resolve(this._socialUser.value);
      } else {
        reject(`No user is currently logged in with ${YoutubeLoginProvider.PROVIDER_ID}`);
      }
    });
  }

  override refreshToken(): Promise<SocialUser | null> {
    return new Promise((resolve, reject) => {
      google.accounts.id.revoke(this._socialUser.value?.id, (response: any) => {
        if (response.error) reject(response.error);
        else resolve(this._socialUser.value);
      });
    });
  }

  getAccessToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this._tokenClient) {
        if (this._socialUser.value) {
          reject('No token client was instantiated, you should specify some scopes.');
        } else {
          reject('You should be logged-in first.');
        }
      } else {
        this._tokenClient.requestAccessToken({
          hint: this._socialUser.value?.email,
        });
        this._receivedAccessToken.pipe(take(1)).subscribe(resolve);
      }
    });
  }

  revokeAccessToken(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this._tokenClient) {
        reject('No token client was instantiated, you should specify some scopes.');
      } else if (!this._accessToken.value) {
        reject('No access token to revoke');
      } else {
        google.accounts.oauth2.revoke(this._accessToken.value, () => {
          this._accessToken.next(null);
          resolve();
        });
      }
    });
  }

  signIn(): Promise<SocialUser> {
    return Promise.reject('You should not call this method directly for Youtube. Use getAccessToken() instead.');
  }

  async signOut(): Promise<void> {
    google.accounts.id.disableAutoSelect();
    this._socialUser.next(null);
  }

  private createSocialUser(idToken: string): SocialUser {
    const user = new SocialUser();
    user.idToken = idToken;
    const payload = this.decodeJwt(idToken);
    user.id = payload['sub'];
    user.name = payload['name'];
    user.email = payload['email'];
    user.photoUrl = payload['picture'];
    user.firstName = payload['given_name'];
    user.lastName = payload['family_name'];
    return user;
  }

  private decodeJwt(idToken: string): Record<string, string | undefined> {
    const base64Url = idToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload);
  }
}
