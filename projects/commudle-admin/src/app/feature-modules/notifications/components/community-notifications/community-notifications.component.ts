import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import _ from 'lodash';
import { INotification } from 'projects/shared-models/notification.model';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { ENotificationStatuses } from 'projects/shared-models/enums/notification_statuses.enum';
import { NotificationsStore } from 'projects/commudle-admin/src/app/feature-modules/notifications/store/notifications.store';

@Component({
  selector: 'app-community-notifications',
  templateUrl: './community-notifications.component.html',
  styleUrls: ['./community-notifications.component.scss'],
})
export class CommunityNotificationsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() communityId = 0;
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

  constructor(private notificationsStore: NotificationsStore) {}

  ngOnInit(): void {
    this.getNotifications();
    this.receiveData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  changeStatus(status: ENotificationStatuses, notification: INotification) {
    this.notificationsStore.changeStatus(status, notification, this.communityId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.markAllAsRead) {
      this.notifications.forEach((notification) => (notification.status = ENotificationStatuses.READ));
    }
  }

  getNotifications() {
    if (!this.isLoading && (!this.total || this.notifications.length < this.total)) {
      this.notificationsStore.getCommunityNotifications(this.page, this.count, this.communityId);
      this.isLoading = true;
      this.subscriptions.push(
        this.notificationsStore.communityNotifications$[this.communityId].subscribe((value) => {
          if (value) {
            this.notifications = _.uniqBy(this.notifications.concat(value), 'id');
            this.page += 1;
            this.total = value.total;
            this.isLoading = false;
            if (this.notifications.length >= this.total) {
              this.canLoadMore = false;
            }
          }
        }),
      );
    }
  }

  receiveData() {
    this.subscriptions.push(
      this.notificationsStore.newCommunityNotifications$.subscribe((data) => {
        if (data.filter_object_id == this.communityId) {
          this.notifications.unshift(data);
        }
      }),
    );

    this.subscriptions.push(
      this.notificationsStore.updateCommunityNotifications$.subscribe((data) => {
        const idx = this.notifications.findIndex((notification) => notification.id === data.notification_queue_id);
        if (idx != -1) {
          this.notifications[idx].status = data;
        }
      }),
    );
  }
}
