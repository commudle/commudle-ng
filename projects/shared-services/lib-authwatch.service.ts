import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ApiRoutesService } from './api-routes.service';
import { API_ROUTES } from './api-routes.constants';
import { ICurrentUser } from '../shared-models/current_user.model';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LibAuthwatchService {

  private currentUserVerified: BehaviorSubject<any> = new BehaviorSubject(null);
  public currentUserVerified$ = this.currentUserVerified.asObservable();
  private authCookieName = 'commudle_user_auth';
  private currentUser: BehaviorSubject<ICurrentUser> = new BehaviorSubject(null);
  public currentUser$ = this.currentUser.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService,
    private cookieService: CookieService
  ) { }

  // to check if cookie exists
  getAuthCookie() {
    // const value = '; ' + this.document.cookie;
    // const parts = value.split('; ' + this.authCookieName + '=');
    // if (parts.length === 2) {
    //   return parts.pop().split(';').shift();
    // }
    return (this.cookieService.check(this.authCookieName) === true ? this.cookieService.get(this.authCookieName) : null);
    // return null;

  }


  // for logout
  deleteAuthCookie() {

    const date = new Date();

    // // consider the cookie to be expired
    // date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // // set the new expiry date on the cookie
    // this.document.cookie = this.authCookieName+"=; expires="+date.toUTCString()+"; path=/";
    this.cookieService.delete(this.authCookieName);
    this.currentUser.next(null);

  }


  // check if user is already signed in
  checkAlreadySignedIn(): Observable<boolean> {

    return this.http.post<any>(
      this.apiRoutesService.getRoute(API_ROUTES.VERIFY_AUTHENTICATION),
      {}).pipe(
        tap(data => {
          if (data.user) {
            this.currentUser.next(data.user);
            this.currentUserVerified.next(true);
          }
        })
      );
  }


  updateSignedInUser() {
    this.checkAlreadySignedIn().subscribe();
  }




}
