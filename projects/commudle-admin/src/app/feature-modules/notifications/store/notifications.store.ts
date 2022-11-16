import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { NotificationsService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notifications.service';
import { NotificationChannel } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/websockets/notification.channel';
import { INotification } from 'projects/shared-models/notification.model';
import { INotifications } from 'projects/shared-models/notifications.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsStore {
  private communityNotificationsCount = {};
  public communityNotificationsCount$ = {};

  private userNotificationCount: BehaviorSubject<number> = new BehaviorSubject(0);
  public userNotificationCount$: Observable<number> = this.userNotificationCount.asObservable();

  private userNotifications = new BehaviorSubject<any>([]);
  public userNotifications$ = this.userNotifications.asObservable();

  private newCommunityNotifications = new BehaviorSubject<any>([]);
  public newCommunityNotifications$ = this.newCommunityNotifications.asObservable();

  private updateCommunityNotifications = new BehaviorSubject<any>([]);
  public updateCommunityNotifications$ = this.updateCommunityNotifications.asObservable();

  private newUserNotifications = new BehaviorSubject<any>([]);
  public newUserNotifications$ = this.newUserNotifications.asObservable();

  private updateUserNotifications = new BehaviorSubject<any>([]);
  public updateUserNotifications$ = this.updateUserNotifications.asObservable();

  private communityNotifications = {};
  public communityNotifications$ = {};

  constructor(private notificationsService: NotificationsService, private notificationChannel: NotificationChannel) {}

  getUserNotifications(page: number, count: number) {
    this.notificationsService.getAllNotifications(page, count).subscribe((data) => {
      this.userNotifications.next(data.notifications);
    });
  }

  generateCommunityNotificationsObservable(communityId) {
    if (!this.communityNotifications[`${communityId}`]) {
      this.communityNotifications[`${communityId}`] = new BehaviorSubject([]);
      this.communityNotifications$[`${communityId}`] = this.communityNotifications[`${communityId}`].asObservable();
    }
  }

  getCommunityNotifications(page: number, count: number, communityId) {
    this.generateCommunityNotificationsObservable(communityId);
    this.notificationsService.getAllNotifications(page, count, communityId, 'community').subscribe((data) => {
      this.communityNotifications[`${communityId}`].next(data.notifications);
    });
  }

  updateNotifications(communityId?: number) {
    this.generateCommunityNotificationsObservable(communityId);
    this.notificationChannel.notificationData$.subscribe((data) => {
      if (data) {
        switch (data.action) {
          case this.notificationChannel.ACTIONS.NEW_NOTIFICATION: {
            if (data.notification_filter == 'community' && data.notification.filter_object_id == communityId) {
              this.incrementCommunityUnreadNotificationsCount(communityId);
              this.newCommunityNotifications.next(data.notification);
            } else if (data.notification_filter == 'user' && !communityId) {
              this.incrementUserUnreadNotificationsCount();
              this.newUserNotifications.next(data.notification);
            }
            break;
          }
          case this.notificationChannel.ACTIONS.STATUS_UPDATE: {
            if (data.notification_filter == 'community') {
              this.updateCommunityNotifications.next(data);
            } else if (data.notification_filter == 'user') {
              this.updateUserNotifications.next(data);
            }
            break;
          }
        }
      }
    });
    // }
  }

  //count functions

  incrementUserUnreadNotificationsCount() {
    this.userNotificationCount.next(this.userNotificationCount.getValue() + 1);
  }

  incrementCommunityUnreadNotificationsCount(id: number) {
    this.communityNotificationsCount[`${id}`].next(this.communityNotificationsCount[`${id}`].getValue() + 1);
  }

  getUserNotificationsCount() {
    this.notificationsService.getUnreadNotificationsCount('', '').subscribe((data) => {
      this.userNotificationCount.next(data);
    });
  }

  reduceCommunityUnreadNotificationsCount(id: number, count?: number) {
    if (count) {
      this.communityNotificationsCount[`${id}`].next(this.communityNotificationsCount[`${id}`].getValue() - count);
    } else {
      this.communityNotificationsCount[`${id}`].next(0);
    }
  }

  reduceUserUnreadNotificationsCount(count?: number) {
    if (count) {
      this.userNotificationCount.next(this.userNotificationCount.getValue() - count);
    } else {
      this.userNotificationCount.next(0);
    }
  }

  getCommunityUnreadNotificationsCount(id: number) {
    this.communityNotificationsCount[`${id}`] = new BehaviorSubject(0);
    this.communityNotificationsCount$[`${id}`] = this.communityNotificationsCount[`${id}`].asObservable();
    this.notificationsService.getUnreadNotificationsCount(id, 'community').subscribe((data) => {
      this.communityNotificationsCount[`${id}`].next(data);
    });
  }
}
