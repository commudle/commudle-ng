import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  createSubscription(subscription: { endpoint: string; p256dh: string; auth: string }): Observable<boolean> {
    return this.http.post<boolean>(this.apiRoutesService.getRoute(API_ROUTES.PUSH_NOTIFICATION_SUBSCRIPTIONS.CREATE), {
      endpoint: subscription.endpoint,
      p256dh: subscription.p256dh,
      auth: subscription.auth,
      user_agent: encodeURI(navigator?.userAgent || ''),
    });
  }

  checkSubscription(): Observable<boolean> {
    const params = new HttpParams().set('user_agent', encodeURI(navigator?.userAgent || ''));
    return this.http.get<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.PUSH_NOTIFICATION_SUBSCRIPTIONS.CHECK_SUBSCRIPTION),
      { params },
    );
  }
}
