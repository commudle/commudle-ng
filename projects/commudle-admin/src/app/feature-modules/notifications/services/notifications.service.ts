import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENotificationStatuses } from 'projects/shared-models/enums/notification_statuses.enum';
import { INotifications } from 'projects/shared-models/notifications.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private apiRoutesService: ApiRoutesService, private http: HttpClient) {}

  getAllNotifications(page, count, id?, filter = ''): Observable<INotifications> {
    const params = new HttpParams().set('page', page).set('count', count).set('recipient_id', id).set('filter', filter);
    return this.http.get<INotifications>(this.apiRoutesService.getRoute(API_ROUTES.NOTIFICATIONS.INDEX), {
      params,
    });
  }

  getUnreadNotificationsCount(id?, filter = ''): Observable<number> {
    const params = new HttpParams().set('recipient_id', id).set('filter', filter);
    return this.http.get<number>(this.apiRoutesService.getRoute(API_ROUTES.NOTIFICATIONS.UNREAD_COUNT), {
      params,
    });
  }

  markAllAsRead(filter: string = '', id?): Observable<boolean> {
    const params = new HttpParams().set('recipient_id', id).set('filter', filter);
    return this.http.post<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.NOTIFICATIONS.MARK_ALL_AS_READ),
      {},
      { params },
    );
  }

  updateNotificationStatus(status: ENotificationStatuses, id: number, recipientId?): Observable<boolean> {
    const params = new HttpParams().set('notification_queue_id', id).set('recipient_id', recipientId);
    return this.http.post<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.NOTIFICATIONS.UPDATE_STATUS),
      { status },
      { params },
    );
  }
}
