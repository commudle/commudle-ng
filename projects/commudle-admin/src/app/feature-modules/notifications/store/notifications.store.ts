import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { Injectable } from '@angular/core';
import { NotificationsService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notifications.service';
@Injectable({
  providedIn: 'root',
})
export class NotificationsStore {
  public communityNotificationCount = {};
  public communityNotificationCount$ = {};

  public userNotificationCount: BehaviorSubject<number> = new BehaviorSubject(0);
  public userNotificationCount$: Observable<number> = this.userNotificationCount.asObservable();

  constructor(
    private apiRoutesService: ApiRoutesService,
    private http: HttpClient,
    private notificationsService: NotificationsService,
  ) {}

  getCommunityUnreadNotificationsCount(id, filter): Observable<number> {
    this.communityNotificationCount[`${id}`] = new BehaviorSubject(0);
    this.communityNotificationCount$[`${id}`] = this.communityNotificationCount[`${id}`].asObservable();
    return this.notificationsService.getUnreadNotificationsCount(id, filter).pipe(
      tap((data: number) => {
        this.communityNotificationCount[`${id}`].next(data);
      }),
    );
  }

  getUserNotificationCount(): Observable<number> {
    return this.notificationsService.getUnreadNotificationsCount('', '').pipe(
      tap((data: number) => {
        this.userNotificationCount.next(data);
        console.log(data);
      }),
    );
  }
}
