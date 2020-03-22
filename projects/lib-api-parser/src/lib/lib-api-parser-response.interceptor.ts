import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ApiParserResponseInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
 ): Observable<HttpEvent<any>> {

  return next.handle(req).pipe(
    tap(resp => {
      if (resp instanceof HttpResponse) {

      }
    }),
    catchError(error => {
      if (error instanceof HttpErrorResponse) {
        // show a dialog/redirect, based on error code
      }
      return of(error);
    })

  );

 }
}
