import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { AuthService } from '@commudle/auth';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { ICurrentUser } from '../shared-models/current_user.model';
import { API_ROUTES } from './api-routes.constants';
import { ApiRoutesService } from './api-routes.service';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';

@Injectable({
  providedIn: 'root',
})
export class LibAuthwatchService {
  private currentUserVerified: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public currentUserVerified$ = this.currentUserVerified.asObservable();
  private currentUser: BehaviorSubject<ICurrentUser> = new BehaviorSubject(null);
  public currentUser$ = this.currentUser.asObservable();

  private appToken;

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiRoutesService: ApiRoutesService,
    private cookieService: CookieService,
    private authService: AuthService,
    private gtm: GoogleTagManagerService,
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
  checkAlreadySignedIn(): Observable<boolean> {
    if (!this.cookieService.check(environment.session_cookie_name)) {
      this.cookieService.set(environment.session_cookie_name, uuidv4(), 30, environment.base_url);
    }
    return this.http.post<any>(this.apiRoutesService.getRoute(API_ROUTES.VERIFY_AUTHENTICATION), {}).pipe(
      tap((data) => {
        this.appToken = data.app_token;
        if (data.user) {
          this.currentUser.next(data.user);
          this.currentUserVerified.next(true);
          this.gtm.dataLayerPushEvent('session_start', {
            com_user_name: data.user.name,
            com_user_id: data.user.id,
            com_user_email: data.user.email,
          });
        } else {
          this.currentUserVerified.next(false);
        }
      }),
    );
  }

  signIn(agent: string, token?: string) {
    return this.http.post(this.apiRoutesService.getRoute(API_ROUTES.VERIFY_AND_LOGIN), {
      agent: agent,
      details: { token },
    });
  }

  // logout
  signOut(): Observable<boolean> {
    this.authService.signOut();
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
}
