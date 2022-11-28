import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { ENotificationStatuses } from 'projects/shared-models/enums/notification_statuses.enum';
import { INotification } from 'projects/shared-models/notification.model';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { NotificationsStore } from 'projects/commudle-admin/src/app/feature-modules/notifications/store/notifications.store';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
})
export class NotificationsListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() markAllAsRead: boolean;
  @Output() closePopover: EventEmitter<any> = new EventEmitter();

  currentUser: ICurrentUser;

  notifications: INotification[] = [];

  page = 1;
  count = 10;
  total: number;
  isLoading = false;
  canLoadMore = true;

  ENotificationStatuses = ENotificationStatuses;
  moment = moment;

  subscriptions: Subscription[] = [];

  constructor(private notificationsStore: NotificationsStore, private authWatchService: LibAuthwatchService) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((currentUser: ICurrentUser) => {
      this.currentUser = currentUser;
    });

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
    this.notificationsStore.changeStatus(status, notification);
    if (status === ENotificationStatuses.INTERACTED) {
      this.closePopover.emit();
    }
  }

  getNotifications() {
    if (!this.isLoading && (!this.total || this.notifications.length < this.total)) {
      this.notificationsStore.getUserNotifications(this.page, this.count);
      this.isLoading = true;
      this.subscriptions.push(
        this.notificationsStore.userNotifications$.subscribe((value) => {
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
      this.notificationsStore.newUserNotifications$.subscribe((data) => {
        if (this.notifications.length != 0 && this.currentUser.id == data.filter_object_id) {
          if (!this.notifications.find((notification) => notification.id == data.id)) {
            this.notifications.unshift(data);
          }
        }
      }),
    );

    this.subscriptions.push(
      this.notificationsStore.updateUserNotifications$.subscribe((data) => {
        const idx = this.notifications.findIndex((notification) => notification.id === data.notification_queue_id);
        if (idx != -1) {
          this.notifications[idx].status = data;
        }
      }),
    );
  }
}
