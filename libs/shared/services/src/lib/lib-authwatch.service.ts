import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '@commudle/shared-environments';
import { ICurrentUser } from '@commudle/shared-models';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { API_ROUTES } from './api-routes.constants';
import { ApiRoutesService } from './api-routes.service';

@Injectable({
  providedIn: 'root',
})
export class LibAuthwatchService {
  private currentUserVerified: BehaviorSubject<any> = new BehaviorSubject(null);
  public currentUserVerified$ = this.currentUserVerified.asObservable();
  // private authCookieName = 'commudle_user_auth';
  private currentUser: BehaviorSubject<ICurrentUser> = new BehaviorSubject(null);
  public currentUser$ = this.currentUser.asObservable();

  private appToken;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService,
    private cookieService: CookieService,
  ) {}

  // to check if cookie exists
  getAuthCookie() {
    // const value = '; ' + this.document.cookie;
    // const parts = value.split('; ' + this.authCookieName + '=');
    // if (parts.length === 2) {
    //   return parts.pop().split(';').shift();
    // }
    return this.cookieService.check(environment.auth_cookie_name) === true
      ? this.cookieService.get(environment.auth_cookie_name)
      : null;
    // return null;
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
        } else {
          this.currentUserVerified.next(false);
        }
      }),
    );
  }

  // logout
  signOut(): Observable<boolean> {
    this.currentUser.next(null);
    this.currentUserVerified.next(false);
    return this.http.delete<any>(this.apiRoutesService.getRoute(API_ROUTES.LOGOUT));
  }

  updateSignedInUser() {
    this.checkAlreadySignedIn().subscribe();
  }

  logInUser() {
    this.document.location.href = `https://auther.commudle.com/?back_to=${encodeURIComponent(window.location.href)}`;
  }
}
