import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { NotificationsService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notifications.service';
import { NotificationChannel } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/websockets/notification.channel';

@Injectable({
  providedIn: 'root',
})
export class NotificationsStore {
  private communityNotificationsCount = {};
  public communityNotificationsCount$ = {};

  private userNotificationCount: BehaviorSubject<number> = new BehaviorSubject(0);
  public userNotificationCount$: Observable<number> = this.userNotificationCount.asObservable();

  constructor(private notificationsService: NotificationsService, private notificationChannel: NotificationChannel) {}

  getCommunityUnreadNotificationsCount(id): Observable<number> {
    this.communityNotificationsCount[`${id}`] = new BehaviorSubject(0);
    this.communityNotificationsCount$[`${id}`] = this.communityNotificationsCount[`${id}`].asObservable();
    return this.notificationsService.getUnreadNotificationsCount(id, 'community').pipe(
      tap((data: number) => {
        this.communityNotificationsCount[`${id}`].next(data);
      }),
    );
  }

  getUserNotificationsCount(): Observable<number> {
    return this.notificationsService.getUnreadNotificationsCount('', '').pipe(
      tap((data: number) => {
        this.userNotificationCount.next(data);
      }),
    );
  }

  reduceCommunityUnreadNotificationsCount(id, count?) {
    if (count) {
      this.communityNotificationsCount[`${id}`].next(this.communityNotificationsCount[`${id}`].getValue() - count);
    } else {
      this.communityNotificationsCount[`${id}`].next(0);
    }
  }

  reduceUserUnreadNotificationsCount(count?) {
    if (count) {
      this.userNotificationCount.next(this.userNotificationCount.getValue() - count);
    } else {
      this.userNotificationCount.next(0);
    }
  }

  incrementCommunityUnreadNotificationsCount(id) {
    this.communityNotificationsCount[`${id}`].next(this.communityNotificationsCount[`${id}`].getValue() + 1);
  }

  incrementUserUnreadNotificationsCount() {
    this.userNotificationCount.next(this.userNotificationCount.getValue() + 1);
  }

  recievedUnreadNotificationsCount(communityId?) {
    this.notificationChannel.notificationData$.subscribe((data) => {
      if (data) {
        switch (data.action) {
          case this.notificationChannel.ACTIONS.NEW_NOTIFICATION: {
            if (data.notification_filter == 'user') {
              this.incrementUserUnreadNotificationsCount();
            } else if (data.notification_filter == 'community' && data.notification.filter_object_id == communityId) {
              this.incrementCommunityUnreadNotificationsCount(communityId);
            }
          }
        }
      }
    });
  }
}
