import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LibAuthwatchService } from './lib-authwatch.service';


@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(public authService: LibAuthwatchService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getAuthCookie()}`
      }
    });

    return next.handle(request);
  }
}
