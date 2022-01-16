import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { INotification } from 'projects/shared-models/notification.model';
import { ENotificationStatus } from 'projects/shared-models/enums/notification_status.enum';
import { NotificationService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notification.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
})
export class NotificationsListComponent implements OnInit, OnDestroy {
  @Input() notifications: INotification[];
  ENotificationStatus = ENotificationStatus;
  subscriptions = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  markAsRead(notification: INotification) {
    this.changeStatus(ENotificationStatus.READ, notification);
  }

  markAsInteracted(notification: INotification) {
    this.changeStatus(ENotificationStatus.INTERACTED, notification);
  }

  changeStatus(status: ENotificationStatus, notification: INotification) {
    this.subscriptions.push(this.notificationService.updateNotificationStatus(status, notification.id).subscribe());
  }
}
