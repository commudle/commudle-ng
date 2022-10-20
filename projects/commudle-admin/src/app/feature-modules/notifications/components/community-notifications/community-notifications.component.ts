import { Component, OnInit, Input } from '@angular/core';
import _ from 'lodash';
import { NotificationsService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notifications.service';
import { INotification } from 'projects/shared-models/notification.model';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { ENotificationStatuses } from 'projects/shared-models/enums/notification_statuses.enum';
import { NotificationChannel } from '../../services/websockets/notification.channel';

@Component({
  selector: 'app-community-notifications',
  templateUrl: './community-notifications.component.html',
  styleUrls: ['./community-notifications.component.scss'],
})
export class CommunityNotificationsComponent implements OnInit {
  @Input() id = 0;

  isLoading = false;

  page = 1;
  count = 10;
  total: number;

  canLoadMore = true;

  moment = moment;
  ENotificationStatuses = ENotificationStatuses;

  notifications: INotification[] = [];

  subscriptions: Subscription[] = [];

  constructor(private notificationsService: NotificationsService, private notificationChannel: NotificationChannel) {}

  ngOnInit(): void {
    this.getNotifications();
    this.receiveData();
  }

  changeStatus(status: ENotificationStatuses, notification: INotification) {
    this.subscriptions.push(this.notificationsService.updateNotificationStatus(status, notification.id).subscribe());
  }

  getNotifications() {
    if (!this.isLoading && (!this.total || this.notifications.length < this.total)) {
      this.isLoading = true;
      this.subscriptions.push(
        this.notificationsService
          .getCommunityNotifications(this.id, this.page, this.count, 'community')
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
        console.log(data);
      }),
    );
  }
}
