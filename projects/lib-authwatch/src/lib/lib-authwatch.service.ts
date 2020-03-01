import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LibAuthwatchService {

  public currentUserVerified: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public currentUserVerified$ = this.currentUserVerified.asObservable();


  constructor(
    private http: HttpClient
  ) { }

  // to check if cookie exists
  getCookie(name: string) {

    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }

    return null;

  }


  // for logout
  deleteCookie(name) {

    const date = new Date();

    // consider the cookie to be expired
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // set the new expiry date on the cookie
    document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";

  }


  // check if user is already signed in
  checkAlreadySignedIn(): Observable<boolean> {

    let authCookie = this.getCookie('commudle_user_auth');

    if (authCookie) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${authCookie}`
        })
      }


      return this.http.post<any>(URLS.VERIFY_AUTH_COOKIE, {}, httpOptions).pipe(
        tap(data => {

          this.currentUserVerified$.next(true);

        }),
        catchError(this.errorViewerService.handleError<Error>('checkAlreadySignedIn')),
      );
    }

    return of();
  }




}
