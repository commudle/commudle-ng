import {
  HttpEvent,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {
  constructor(private transferState: TransferState) {}

  // Interceptor for SSR to cache HTTP requests
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: HttpSentEvent | HttpHeaderResponse | HttpResponse<any> | HttpProgressEvent | HttpUserEvent<any>) => {
        if (event instanceof HttpResponse && (event.status === 200 || event.status === 202)) {
          this.transferState.set(makeStateKey(request.url), event.body);
        }
      }),
    );
  }
}
