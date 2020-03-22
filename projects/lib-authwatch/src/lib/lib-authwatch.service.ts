import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ApiRoutesService, API_ROUTES } from 'projects/lib-api-routes/src/public-api';


@Injectable({
  providedIn: 'root'
})
export class LibAuthwatchService {

  private currentUserVerified: BehaviorSubject<any> = new BehaviorSubject(null);
  public currentUserVerified$ = this.currentUserVerified.asObservable();
  private authCookieName = 'commudle_user_auth';

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }

  // to check if cookie exists
  getAuthCookie() {

    const value = '; ' + document.cookie;
    const parts = value.split('; ' + this.authCookieName + '=');
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }

    return null;

  }


  // for logout
  deleteAuthCookie() {

    const date = new Date();

    // consider the cookie to be expired
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // set the new expiry date on the cookie
    document.cookie = this.authCookieName+"=; expires="+date.toUTCString()+"; path=/";

  }


  // check if user is already signed in
  checkAlreadySignedIn(): Observable<boolean> {

    return this.http.post<any>(
      this.apiRoutesService.getRoute(API_ROUTES.VERIFY_AUTHENTICATION),
      {}).pipe(
        tap(data => {
          this.currentUserVerified.next(true);
        })
      );
  }




}
