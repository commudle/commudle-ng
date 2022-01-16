import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notification.service';
import { NotificationChannel } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/websockets/notification-channel';
import { INotification } from 'projects/shared-models/notification.model';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss'],
})
export class NotificationsPageComponent implements OnInit, OnDestroy {
  subscriptions = [];
  notifications: INotification[] = [];

  page = 1;
  count = 10;
  total;
  isLoading = false;
  canLoadMore = true;

  constructor(private notificationChannel: NotificationChannel, public notificationService: NotificationService) {}

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
    if (!this.isLoading && (!this.total || this.notifications.length < this.total)) {
      this.isLoading = true;
      this.subscriptions.push(
        this.notificationService.getAllNotifications(this.page, this.count).subscribe((val) => {
          this.notifications = this.notifications.concat(val.notifications.reverse());
          this.page += 1;
          this.total = val.total;
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
              this.notifications.unshift(data.notification);
            }
            case this.notificationChannel.ACTIONS.STATUS_UPDATE: {
            }
          }
        }
      }),
    );
  }
}
