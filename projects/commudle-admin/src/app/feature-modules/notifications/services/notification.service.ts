import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENotificationStatus } from 'projects/shared-models/enums/notification_status.enum';
import { INotifications } from 'projects/shared-models/notifications.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private apiRoutesService: ApiRoutesService, private http: HttpClient) {}

  private closeNotificationPopover: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public closeNotificationPopover$ = this.closeNotificationPopover.asObservable();

  getAllNotifications(page, count): Observable<INotifications> {
    const params = new HttpParams().set('page', page).set('count', count);
    return this.http.get<INotifications>(this.apiRoutesService.getRoute(API_ROUTES.NOTIFICATIONS.INDEX), { params });
  }

  updateNotificationStatus(status: ENotificationStatus, id: string) {
    const params = new HttpParams().set('notification_queue_id', id);
    return this.http.post<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.NOTIFICATIONS.UPDATE_STATUS),
      { status },
      { params },
    );
  }

  setCloseNotificationPopover(value: boolean) {
    this.closeNotificationPopover.next(value);
  }
}
