import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/commudle-admin/src/environments/environment';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(public authService: LibAuthwatchService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.startsWith(environment.base_url)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getAuthCookie()}`,
        },
      });
    }

    return next.handle(request);
  }
}
