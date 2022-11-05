import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import _ from 'lodash';
import { NotificationsService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notifications.service';
import { INotification } from 'projects/shared-models/notification.model';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { ENotificationStatuses } from 'projects/shared-models/enums/notification_statuses.enum';
import { NotificationChannel } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/websockets/notification.channel';
import { NotificationsStore } from 'projects/commudle-admin/src/app/feature-modules/notifications/store/notifications.store';

@Component({
  selector: 'app-community-notifications',
  templateUrl: './community-notifications.component.html',
  styleUrls: ['./community-notifications.component.scss'],
})
export class CommunityNotificationsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() id = 0;
  @Input() markAllAsRead: boolean;

  isLoading = false;

  page = 1;
  count = 10;
  total: number;

  canLoadMore = true;

  moment = moment;
  ENotificationStatuses = ENotificationStatuses;

  notifications: INotification[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private notificationsService: NotificationsService,
    private notificationChannel: NotificationChannel,
    private notificationsStore: NotificationsStore,
  ) {}

  ngOnInit(): void {
    this.getNotifications();
    this.receiveData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  changeStatus(status: ENotificationStatuses, notification: INotification) {
    this.subscriptions.push(
      this.notificationsService.updateNotificationStatus(status, notification.id, this.id).subscribe(() => {
        this.notificationsStore.communityNotificationCount[this.id].next(
          this.notificationsStore.communityNotificationCount[this.id].value - 1,
        );
      }),
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.markAllAsRead) {
      this.notifications.forEach((notification) => (notification.status = ENotificationStatuses.READ));
    }
  }

  getNotifications() {
    if (!this.isLoading && (!this.total || this.notifications.length < this.total)) {
      this.isLoading = true;
      this.subscriptions.push(
        this.notificationsService
          .getAllNotifications(this.page, this.count, this.id, 'community')
          .subscribe((value) => {
            this.notifications = _.uniqBy(this.notifications.concat(value.notifications), 'id');
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
              // add only if it's not already in the list
              if (
                !this.notifications.find((notification) => notification.id === data.notification.id) &&
                data.notification_filter === 'community'
              ) {
                this.notifications.unshift(data.notification);
              }
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
