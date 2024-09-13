import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';

export class EmailLoginProvider extends BaseLoginProvider {
  public static readonly PROVIDER_ID: string = 'EMAIL';

  constructor() {
    super();
  }

  getLoginStatus(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  }

  initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  signIn({ email, password }: { email: string; password: string }): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  }
}
