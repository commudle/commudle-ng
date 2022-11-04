import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { Injectable } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsStore {
  private unreadNotificationsCount: BehaviorSubject<any> = new BehaviorSubject(new Set());
  public unreadNotificationsCount$: Observable<number> = this.unreadNotificationsCount.asObservable();

  private notificationData = {};
  public notificationData$ = {};

  constructor(
    private apiRoutesService: ApiRoutesService,
    private http: HttpClient,
    private notificationsService: NotificationsService,
  ) {}

  get(id) {
    const connectionName = `${id}`;
    this.notificationData[`${id}`] = new BehaviorSubject(null);
    this.notificationData$[`${id}`] = this.notificationData[`${id}`].asObservable();
    this.unreadNotificationsCount.next(this.unreadNotificationsCount.getValue().add(`${id}`));
  }

  getUnreadNotificationsCount(id?, filter?): Observable<number> {
    return this.notificationsService.getUnreadNotificationsCount(id, filter).pipe(
      tap((data: number) => {
        data;
        this.unreadNotificationsCount.next(data);
      }),
    );
  }
}
