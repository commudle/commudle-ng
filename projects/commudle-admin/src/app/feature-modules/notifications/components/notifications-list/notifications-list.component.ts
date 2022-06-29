import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { NotificationService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notification.service';
import { NotificationChannel } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/websockets/notification.channel';
import { ENotificationStatuses } from 'projects/shared-models/enums/notification_statuses.enum';
import { INotification } from 'projects/shared-models/notification.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
})
export class NotificationsListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() markAllAsRead: boolean;
  @Output() closePopover: EventEmitter<any> = new EventEmitter();

  notifications: INotification[] = [];

  page = 1;
  count = 10;
  total: number;
  isLoading = false;
  canLoadMore = true;

  ENotificationStatuses = ENotificationStatuses;
  moment = moment;

  subscriptions: Subscription[] = [];

  constructor(private notificationService: NotificationService, private notificationChannel: NotificationChannel) {}

  ngOnInit(): void {
    this.getNotifications();
    this.receiveData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.markAllAsRead) {
      this.notifications.forEach((notification) => (notification.status = ENotificationStatuses.READ));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  changeStatus(status: ENotificationStatuses, notification: INotification) {
    this.subscriptions.push(this.notificationService.updateNotificationStatus(status, notification.id).subscribe());

    if (status === ENotificationStatuses.INTERACTED) {
      this.closePopover.emit();
    }
  }

  getNotifications() {
    if (!this.isLoading && (!this.total || this.notifications.length < this.total)) {
      this.isLoading = true;
      this.subscriptions.push(
        this.notificationService.getAllNotifications(this.page, this.count).subscribe((value) => {
          this.notifications = this.notifications.concat(value.notifications);
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
