import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibErrorHandlerService } from 'projects/lib-error-handler/src/public-api';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApiParserResponseInterceptor implements HttpInterceptor {
  constructor(private errorHandleService: LibErrorHandlerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          event = event.clone({
            body: event.body.data,
          });
          return event;
        }
      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          // show a dialog/redirect, based on error code
          this.errorHandleService.handleError(error.status, error.error.message);
        }
        return of(error);
      }),
    );
  }
}
