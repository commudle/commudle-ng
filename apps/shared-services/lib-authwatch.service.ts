import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@commudle/auth';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { ICurrentUser } from '../shared-models/current_user.model';
import { API_ROUTES } from './api-routes.constants';
import { ApiRoutesService } from './api-routes.service';

@Injectable({
  providedIn: 'root',
})
export class LibAuthwatchService {
  private currentUserVerified: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public currentUserVerified$ = this.currentUserVerified.asObservable();
  private currentUser: BehaviorSubject<ICurrentUser> = new BehaviorSubject(null);
  public currentUser$ = this.currentUser.asObservable();

  private appToken;

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiRoutesService: ApiRoutesService,
    private cookieService: CookieService,
    private gtm: GoogleTagManagerService,
    private injector: Injector,
  ) {}

  // to check if cookie exists
  getAuthCookie() {
    return this.cookieService.check(environment.auth_cookie_name) === true
      ? this.cookieService.get(environment.auth_cookie_name)
      : null;
  }

  getAppToken() {
    return this.appToken;
  }

  // check if user is already signed in
  checkAlreadySignedIn(): Observable<any> {
    if (!this.cookieService.check(environment.session_cookie_name)) {
      this.cookieService.set(environment.session_cookie_name, uuidv4(), {
        ...(environment.production && { domain: '.commudle.com' }),
        expires: 30,
        path: '/',
      });
    }
    return this.http.post<any>(this.apiRoutesService.getRoute(API_ROUTES.VERIFY_AUTHENTICATION), {}).pipe(
      tap((data) => {
        this.appToken = data.app_token;
        if (data.user) {
          this.currentUser.next(data.user);
          this.currentUserVerified.next(true);
          this.gtm.dataLayerPushEvent('session-start', {
            com_user_name: data.user.name,
            com_user_id: data.user.id,
            com_user_email: data.user.email,
          });
        } else {
          this.currentUserVerified.next(false);
          this.cookieService.delete(environment.auth_cookie_name, '/', environment.production ? '.commudle.com' : '');
        }
      }),
    );
  }

  signIn(agent: string, consent_privacy_tnc: boolean, consent_marketing: boolean, token?: string) {
    return this.http.post(this.apiRoutesService.getRoute(API_ROUTES.VERIFY_AND_LOGIN), {
      agent: agent,
      details: { token },
      consent_privacy_tnc: consent_privacy_tnc,
      consent_marketing: consent_marketing,
    });
  }

  // logout
  signOut(): Observable<boolean> {
    this.injector.get(AuthService).signOut();
    this.currentUser.next(null);
    this.currentUserVerified.next(false);
    return this.http.delete<any>(this.apiRoutesService.getRoute(API_ROUTES.LOGOUT));
  }

  updateSignedInUser() {
    this.checkAlreadySignedIn().subscribe();
  }

  logInUser() {
    this.router.navigate(['/login'], { queryParams: { redirect: this.router.url } });
  }

  getUserData(): Observable<{ consent_privacy_tnc: boolean; consent_marketing: boolean }> {
    return this.http.post<any>(this.apiRoutesService.getRoute(API_ROUTES.VERIFY_AUTHENTICATION), {}).pipe(
      map((data) => {
        if (data.user) {
          const consent_privacy_tnc = data.user.consent_privacy_tnc;
          const consent_marketing = data.user.consent_marketing;
          return { consent_privacy_tnc, consent_marketing };
        }
      }),
    );
  }
}
