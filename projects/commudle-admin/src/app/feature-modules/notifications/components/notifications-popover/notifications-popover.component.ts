import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationChannel } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/websockets/notification-channel';
import { INotification } from 'projects/shared-models/notification.model';
import { NotificationService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notification.service';
import { ENotificationStatus } from 'projects/shared-models/enums/notification_status.enum'

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

  ENotificationStatus = ENotificationStatus;

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
    this.subscriptions.push(
      this.notificationService.getAllNotifications(this.page, this.count).subscribe((val) => {
        this.notifications = val.notifications;
      })
    )
  }

  receiveData() {
    this.subscriptions.push(
      this.notificationChannel.notificationData$.subscribe((data) => {
        if (data) {
          switch (data.action) {
            case this.notificationChannel.ACTIONS.NEW_NOTIFICATION: {
              this.notifications.unshift(data.notification);
            }
            case this.notificationChannel.ACTIONS.STATUS_UPDATE: {
              const idx = this.notifications.findIndex((notification) => notification.id === data.notification_queue_id);
              if(idx != -1){
                this.notifications[idx].status = data.status;
              }
            }
          }
        }
      }),
    );
  }

  markAsRead(notification: INotification) {
    this.changeStatus(ENotificationStatus.READ, notification);
  }

  markAsInteracted(notification: INotification) {
    this.changeStatus(ENotificationStatus.INTERACTED, notification);
  }

  changeStatus(status: ENotificationStatus, notification: INotification) {
    this.subscriptions.push(
      this.notificationService.updateNotificationStatus(status, notification.id).subscribe()
    )
  }
}
