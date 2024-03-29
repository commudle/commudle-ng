import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENotificationStatuses } from 'apps/shared-models/enums/notification_statuses.enum';
import { INotifications } from 'apps/shared-models/notifications.model';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private apiRoutesService: ApiRoutesService, private http: HttpClient) {}

  getAllNotifications(page, count, id?, filter?): Observable<INotifications> {
    let params = new HttpParams().set('page', page).set('count', count);
    if (id && filter) {
      params = params.set('recipient_id', id).set('filter', filter);
    }
    return this.http.get<INotifications>(this.apiRoutesService.getRoute(API_ROUTES.NOTIFICATIONS.INDEX), {
      params,
    });
  }

  getUnreadNotificationsCount(id?, filter?): Observable<number> {
    let params = new HttpParams();
    if (id && filter) {
      params = params.set('recipient_id', id).set('filter', filter);
    }
    return this.http.get<number>(this.apiRoutesService.getRoute(API_ROUTES.NOTIFICATIONS.UNREAD_COUNT), {
      params,
    });
  }

  markAllAsRead(id?, filter?): Observable<boolean> {
    let params = new HttpParams();
    if (id && filter) {
      params = params.set('recipient_id', id).set('filter', filter);
    }
    return this.http.post<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.NOTIFICATIONS.MARK_ALL_AS_READ),
      {},
      { params },
    );
  }

  updateNotificationStatus(status: ENotificationStatuses, id: number, recipientId?): Observable<boolean> {
    let params = new HttpParams().set('notification_queue_id', id);
    if (recipientId) {
      params = params.set('recipient_id', recipientId);
    }
    return this.http.post<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.NOTIFICATIONS.UPDATE_STATUS),
      { status },
      { params },
    );
  }
}
