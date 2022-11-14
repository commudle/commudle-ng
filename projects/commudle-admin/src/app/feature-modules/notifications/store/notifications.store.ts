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

  // TODO write data types
  // TODO: pass default values in service while calling API
  getUserNotifications(page: number, count: number) {
    this.notificationsService.getAllNotifications(page, count).subscribe((data) => {
      this.userNotifications.next(data);
    });
  }

  getCommunityNotifications(page: number, count: number, communityId) {
    this.communityNotifications[`${communityId}`] = new BehaviorSubject(new Set());
    this.communityNotifications$[`${communityId}`] = this.communityNotifications[`${communityId}`].asObservable();
    this.notificationsService.getAllNotifications(page, count, communityId, 'community').subscribe((data) => {
      this.communityNotifications[`${communityId}`].next(data.notifications);
    });
  }

  // TODO: Status case for channel
  // updateCommunityNotifications(communityId: number) {
  //   this.notificationChannel.notificationData$.subscribe((data) => {
  //     console.log(data);
  //     if (data) {
  //       switch (data.action) {
  //         case this.notificationChannel.ACTIONS.NEW_NOTIFICATION: {
  //           if (data.notification_filter === 'community' && data.notification.filter_object_id == communityId) {
  //             this.communityNotifications[`${communityId}`].next(data.notification);
  //           }
  //           break;
  //         }
  //       }
  //     }
  //   });
  // }
  //TODO:check case
  getCommunityUnreadNotificationsCount(id: number) {
    this.communityNotificationsCount[`${id}`] = new BehaviorSubject(0);
    this.communityNotificationsCount$[`${id}`] = this.communityNotificationsCount[`${id}`].asObservable();
    this.notificationsService.getUnreadNotificationsCount(id, 'community').subscribe((data) => {
      this.communityNotificationsCount[`${id}`].next(data);
    });
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

  incrementCommunityUnreadNotificationsCount(id: number) {
    this.communityNotificationsCount[`${id}`].next(this.communityNotificationsCount[`${id}`].getValue() + 1);
  }

  updateCommunityNotifications(communityId: number) {
    if (this.communityNotifications[`${communityId}`]) {
      this.notificationChannel.notificationData$.subscribe((data) => {
        if (data) {
          switch (data.action) {
            case this.notificationChannel.ACTIONS.NEW_NOTIFICATION: {
              if (data.notification_filter == 'community' && data.notification.filter_object_id == communityId) {
                this.incrementCommunityUnreadNotificationsCount(communityId);
                console.log(this.communityNotifications[`${communityId}`].getValue());
                this.communityNotifications[`${communityId}`].next(data.notification);
              }
            }
          }
        }
      });
    }
  }

  incrementUserUnreadNotificationsCount() {
    this.userNotificationCount.next(this.userNotificationCount.getValue() + 1);
  }
  //TODO: change name
  receivedUserUnreadNotificationsCount() {
    this.notificationChannel.notificationData$.subscribe((data) => {
      if (data) {
        console.log(data);
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
}
