import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationStateService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notification-state.service';
import { NotificationService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notification.service';
import { NotificationChannel } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/websockets/notification-channel';
import { NotificationMessageGeneration } from 'projects/commudle-admin/src/app/feature-modules/notifications/utils/notification-message-generation.util';
import { INotification } from 'projects/shared-models/notification.model';
import { SeoService } from 'projects/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss'],
})
export class NotificationsPageComponent implements OnInit, OnDestroy {
  notifications: INotification[] = [];

  page = 1;
  count = 10;
  total: number;
  isLoading = false;
  canLoadMore = true;

  subscriptions: Subscription[] = [];

  constructor(
    private notificationChannel: NotificationChannel,
    private notificationService: NotificationService,
    private notificationStateService: NotificationStateService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.notificationStateService.setNotificationPageState(true);
    this.getNotifications();
    this.receiveData();
    this.seoService.noIndex(true);
  }

  ngOnDestroy(): void {
    this.seoService.noIndex(false);
    this.notificationStateService.setNotificationPageState(false);
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getNotifications() {
    if (!this.isLoading && (!this.total || this.notifications.length < this.total)) {
      this.isLoading = true;
      this.subscriptions.push(
        this.notificationService.getAllNotifications(this.page, this.count).subscribe((value) => {
          let notifications = value.notifications.reverse();
          notifications.forEach((notification) => {
            notification.notification_message = new NotificationMessageGeneration(notification).generateMessage();
          });
          this.notifications = this.notifications.concat(notifications);
          this.page += 1;
          this.total = value.total;
          this.isLoading = false;
          if (this.notifications.length >= this.total) {
            this.canLoadMore = false;
          }
        }),
      );
    }
  }

  receiveData() {
    this.subscriptions.push(
      this.notificationChannel.notificationData$.subscribe((data) => {
        if (data) {
          switch (data.action) {
            case this.notificationChannel.ACTIONS.NEW_NOTIFICATION: {
              data.notification.notification_message = new NotificationMessageGeneration(
                data.notification,
              ).generateMessage();
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
              break;
            }
          }
        }
      }),
    );
  }
}
