import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notification.service';
import { ENotificationStatus } from 'projects/shared-models/enums/notification_status.enum';
import { INotification } from 'projects/shared-models/notification.model';

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
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  changeStatus(status: ENotificationStatus, notification: INotification) {
    this.subscriptions.push(this.notificationService.updateNotificationStatus(status, notification.id).subscribe());
  }

  closePopover() {
    this.notificationService.setCloseNotificationPopover(true);
  }
}
