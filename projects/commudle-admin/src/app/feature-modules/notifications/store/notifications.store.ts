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

  private userNotifications = new BehaviorSubject<any>(new Set());
  public userNotifications$ = this.userNotifications.asObservable();

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
      console.log(data.notifications);
      console.log(this.communityNotifications[`${communityId}`].getValue());
    });
  }

  updateNotifications(communityId?: number) {
    // if (this.communityNotifications[`${communityId}`]) {
    this.generateCommunityNotificationsObservable(communityId);
    this.notificationChannel.notificationData$.subscribe((data) => {
      if (data) {
        switch (data.action) {
          case this.notificationChannel.ACTIONS.NEW_NOTIFICATION: {
            if (data.notification_filter == 'community' && data.notification.filter_object_id == communityId) {
              this.incrementCommunityUnreadNotificationsCount(communityId);
              this.communityNotifications[`${communityId}`].next(data.notification);
            } else if (data.notification_filter == 'user') {
              this.incrementUserUnreadNotificationsCount();
              this.userNotifications.next(data.notification);
            }
            break;
          }
          case this.notificationChannel.ACTIONS.STATUS_UPDATE: {
            // const idx = this.communityNotifications[`${communityId}`].findIndex(
            //   (notification) => notification.id === data.notification_queue_id,
            // );
            // if (idx != -1) {
            this.communityNotifications[`${communityId}`].status = data.status;
            // }
            break;
          }
        }
      }
    });
    // }
  }

  //count functions
  //TODO: change name
  receivedUserUnreadNotificationsCount() {
    this.notificationChannel.notificationData$.subscribe((data) => {
      if (data) {
        switch (data.action) {
          case this.notificationChannel.ACTIONS.NEW_NOTIFICATION: {
            if (data.notification_filter == 'user') {
              this.incrementUserUnreadNotificationsCount();
            }
          }
        }
      }
    });
  }

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
