import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENotificationStatuses } from '@commudle/shared-models';
import { INotifications } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private apiRoutesService: ApiRoutesService, private http: HttpClient) {}

  getAllNotifications(page, count): Observable<INotifications> {
    const params = new HttpParams().set('page', page).set('count', count);
    return this.http.get<INotifications>(this.apiRoutesService.getRoute(API_ROUTES.NOTIFICATIONS.INDEX), { params });
  }

  getCommunityNotifications(id, page, count): Observable<INotifications> {
    const params = new HttpParams().set('community_id', id).set('page', page).set('count', count);
    return this.http.get<INotifications>(this.apiRoutesService.getRoute(API_ROUTES.NOTIFICATIONS.INDEX_BY_COMMUNITY), {
      params,
    });
  }

  getUnreadNotificationsCount(): Observable<number> {
    return this.http.get<number>(this.apiRoutesService.getRoute(API_ROUTES.NOTIFICATIONS.UNREAD_COUNT));
  }

  markAllAsRead(): Observable<boolean> {
    return this.http.post<boolean>(this.apiRoutesService.getRoute(API_ROUTES.NOTIFICATIONS.MARK_ALL_AS_READ), {});
  }

  updateNotificationStatus(status: ENotificationStatuses, id: number): Observable<boolean> {
    const params = new HttpParams().set('notification_queue_id', id);
    return this.http.post<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.NOTIFICATIONS.UPDATE_STATUS),
      { status },
      { params },
    );
  }
}
