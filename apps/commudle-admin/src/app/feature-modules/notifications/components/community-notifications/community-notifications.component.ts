import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NotificationsStore } from 'apps/commudle-admin/src/app/feature-modules/notifications/store/notifications.store';
import { ENotificationStatuses } from 'apps/shared-models/enums/notification_statuses.enum';
import { INotification } from 'apps/shared-models/notification.model';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ENotificationSenderTypes } from 'apps/shared-models/enums/notification_sender_types.enum';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';

@Component({
  selector: 'app-community-notifications',
  templateUrl: './community-notifications.component.html',
  styleUrls: ['./community-notifications.component.scss'],
})
export class CommunityNotificationsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() communityId = 0;
  @Input() markAllAsRead: boolean;

  isLoading = true;

  page = 1;
  count = 10;
  total: number;

  canLoadMore = true;

  moment = moment;
  ENotificationStatuses = ENotificationStatuses;
  ENotificationSenderTypes = ENotificationSenderTypes;

  notifications: INotification[] = [];

  subscriptions: Subscription[] = [];

  constructor(private notificationsStore: NotificationsStore, private gtm: GoogleTagManagerService) {}

  ngOnInit(): void {
    this.getNotifications();
    this.receiveData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  changeStatus(status: ENotificationStatuses, notification: INotification) {
    this.notificationsStore.changeStatus(status, notification, this.communityId);
    if (status !== ENotificationStatuses.INTERACTED) {
      this.gtmService();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.markAllAsRead) {
      this.notifications.forEach((notification) => (notification.status = ENotificationStatuses.READ));
    }
  }

  getNotifications() {
    if (!this.total || this.notifications.length < this.total) {
      this.notificationsStore.getCommunityNotifications(this.page, this.count, this.communityId);
      this.subscriptions.push(
        this.notificationsStore.communityNotifications$[this.communityId].subscribe((value) => {
          if (value.notifications) {
            this.notifications = _.uniqBy(this.notifications.concat(value.notifications), 'id');
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

  unread() {
    this.notifications = this.notifications.filter(
      (notification) => notification.status === ENotificationStatuses.UNREAD,
    );
  }

  allNotifications() {
    this.notifications = [];
    this.page = 1;
    this.total = 0;
    this.getNotifications();
  }

  gtmService() {
    this.gtm.dataLayerPushEvent('click-notification-mark-as-read', {
      com_notification_type: this.ENotificationSenderTypes.KOMMUNITY,
    });
  }
}
