import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationChannel } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/websockets/notification-channel';
import { INotification } from 'projects/shared-models/notification.model';
import { NotificationService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notification.service';
import { ENotificationStatuses } from 'projects/shared-models/enums/notification_statuses.enum';

@Component({
  selector: 'app-notifications-popover',
  templateUrl: './notifications-popover.component.html',
  styleUrls: ['./notifications-popover.component.scss'],
})
export class NotificationsPopoverComponent implements OnInit, OnDestroy {
  subscriptions = [];
  notifications: INotification[] = [];

  page = 1;
  count = 10;

  constructor(private notificationChannel: NotificationChannel, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getOlderNotifications();
    this.receiveData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  getOlderNotifications() {
    this.notificationService.getAllNotifications(this.page, this.count).subscribe((val) => {
      this.notifications = val.notifications;
      console.log(this.notifications);
    });
  }

  receiveData() {
    this.subscriptions.push(
      this.notificationChannel.notificationData$.subscribe((data) => {
        if (data) {
          switch (data.action) {
            case this.notificationChannel.ACTIONS.NEW_NOTIFICATION: {
              this.notifications.unshift(data?.notification);
            }
            case this.notificationChannel.ACTIONS.STATUS_UPDATE: {
            }
          }
        }
      }),
    );
  }

  markAsRead(notification: INotification) {
    this.changeStatus(ENotificationStatuses.READ, notification);
  }

  markAsInteracted(notification: INotification) {
    this.changeStatus(ENotificationStatuses.INTERACTED, notification);
  }

  changeStatus(status: string, notification: INotification) {
    this.notificationService.updateNotificationStatus(status, notification.id).subscribe((val) => {
      if (val) {
        let idx = -1;
        for (let i = 0; i < this.notifications.length; i++) {
          if (this.notifications[i].id === notification.id) {
            idx = i;
            break;
          }
        }

        if (idx != -1) {
          this.notifications[idx].status = status;
        }
      }
    });
  }
}
