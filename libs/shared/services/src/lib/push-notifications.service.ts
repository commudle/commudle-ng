import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from './api-routes.constants';
import { ApiRoutesService } from './api-routes.service';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  createSubscription(
    subscription: { endpoint: string; p256dh: string; auth: string },
    reason: string,
  ): Observable<boolean> {
    return this.http.post<boolean>(this.apiRoutesService.getRoute(API_ROUTES.PUSH_NOTIFICATION_SUBSCRIPTIONS.CREATE), {
      endpoint: subscription.endpoint,
      p256dh: subscription.p256dh,
      auth: subscription.auth,
      user_agent: encodeURI(navigator?.userAgent || ''),
      reason,
    });
  }
}
