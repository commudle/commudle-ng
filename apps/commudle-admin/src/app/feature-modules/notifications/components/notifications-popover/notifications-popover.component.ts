import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ENotificationStatuses } from 'apps/shared-models/enums/notification_statuses.enum';
import { INotification } from 'apps/shared-models/notification.model';

@Component({
  selector: 'app-notifications-popover',
  templateUrl: './notifications-popover.component.html',
  styleUrls: ['./notifications-popover.component.scss'],
})
export class NotificationsPopoverComponent implements OnInit {
  @Output() closePopover: EventEmitter<any> = new EventEmitter();

  ENotificationStatuses = ENotificationStatuses;

  constructor() {}

  ngOnInit(): void {}

  // changeStatus(status: ENotificationStatuses, notification: INotification) {
  //   this.notificationsStore.changeStatus(status, notification);
  //   if (status === ENotificationStatuses.INTERACTED) {
  //     this.closePopover.emit();
  //   } else {
  //     this.gtmService();
  //   }
  // }
}
