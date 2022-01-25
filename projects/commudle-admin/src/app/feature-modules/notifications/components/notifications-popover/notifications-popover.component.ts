import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notification.service';
import { NotificationChannel } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/websockets/notification-channel';
import { ENotificationStatus } from 'projects/shared-models/enums/notification_status.enum';
import { INotification } from 'projects/shared-models/notification.model';
import { Subscription } from 'rxjs';
import { NotificationStateService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notification-state.service';

@Component({
  selector: 'app-notifications-popover',
  templateUrl: './notifications-popover.component.html',
  styleUrls: ['./notifications-popover.component.scss'],
})
export class NotificationsPopoverComponent implements OnInit, OnDestroy {
  notifications: INotification[] = [];

  page = 1;
  count = 10;

  ENotificationStatus = ENotificationStatus;

  subscriptions: Subscription[] = [];

  isLoading = false;

  constructor(
    private notificationChannel: NotificationChannel,
    private notificationService: NotificationService,
    private notificationStateService: NotificationStateService,
  ) {}

  ngOnInit(): void {
    this.notificationStateService.setNotificationPopoverState(true);
    this.getNotifications();
    this.receiveData();
  }

  ngOnDestroy(): void {
    this.notificationStateService.setNotificationPopoverState(false);
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  getNotifications() {
    this.isLoading = true;
    this.subscriptions.push(
      this.notificationService.getAllNotifications(this.page, this.count).subscribe((value) => {
        this.notifications = value.notifications.reverse();
        this.isLoading = false;
      }),
    );
  }

  receiveData() {
    this.subscriptions.push(
      this.notificationChannel.notificationData$.subscribe((data) => {
        if (data) {
          switch (data.action) {
            case this.notificationChannel.ACTIONS.NEW_NOTIFICATION: {
              this.notifications.unshift(data.notification);
              break;
            }
            case this.notificationChannel.ACTIONS.STATUS_UPDATE: {
              const idx = this.notifications.findIndex(
                (notification) => notification.id === data.notification_queue_id,
              );
              if (idx != -1) {
                this.notifications[idx].status = data.status;
              }
            }
          }
        }
      }),
    );
  }

  closePopover() {
    this.notificationStateService.setCloseNotificationPopover(true);
  }
}
