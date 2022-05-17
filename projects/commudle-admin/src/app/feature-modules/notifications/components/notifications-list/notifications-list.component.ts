import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationStateService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notification-state.service';
import { NotificationService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notification.service';
import { ENotificationEntityTypes } from 'projects/shared-models/enums/notification_entity_types.enum';
import { ENotificationMessageTypes } from 'projects/shared-models/enums/notification_message_types.enum';
import { ENotificationParentTypes } from 'projects/shared-models/enums/notification_parent_types.enum';
import { ENotificationStatuses } from 'projects/shared-models/enums/notification_statuses.enum';
import { INotification } from 'projects/shared-models/notification.model';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
})
export class NotificationsListComponent implements OnInit, OnDestroy {
  @Input() notifications: INotification[];

  ENotificationStatuses = ENotificationStatuses;

  subscriptions = [];
  moment = moment;

  constructor(
    private notificationService: NotificationService,
    private notificationStateService: NotificationStateService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.setNotificationTimeFormat();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  changeStatus(status: ENotificationStatuses, notification: INotification, redirect: boolean = false) {
    this.subscriptions.push(this.notificationService.updateNotificationStatus(status, notification.id).subscribe());

    if (redirect) {
      this.redirectTo(notification);
    }
  }

  closePopover() {
    this.notificationStateService.setCloseNotificationPopover(true);
  }

  setNotificationTimeFormat() {
    moment.locale('en', {
      relativeTime: {
        past: '%s',
        s: '1s',
        ss: '%ss',
        m: '1m',
        mm: '%dm',
        h: '1h',
        hh: '%dh',
        d: '1d',
        dd: '%dd',
        M: '1M',
        MM: '%dM',
        y: '1Y',
        yy: '%dY',
      },
    });
  }

  redirectTo(notification: INotification) {
    switch (notification.notification_message_type) {
      case ENotificationMessageTypes.FOLLOW_CREATED:
        this.router.navigate(['/users', notification.sender.username]);
        break;
      case ENotificationMessageTypes.VOTE_CREATED:
        switch (notification.entity_type) {
          case ENotificationEntityTypes.LAB:
            if ('slug' in notification.entity) {
              this.router.navigate(['/labs', notification.entity.slug]);
            }
            break;
          case ENotificationEntityTypes.COMMUNITY_BUILD:
            if ('slug' in notification.entity) {
              this.router.navigate(['/builds', notification.entity.slug]);
            }
            break;
        }
        break;
      case ENotificationMessageTypes.MESSAGE_CREATED:
        switch (notification.parent_type) {
          case ENotificationParentTypes.LAB:
            if ('slug' in notification.parent) {
              this.router.navigate(['/labs', notification.parent.slug]);
            }
            break;
          case ENotificationParentTypes.COMMUNITY_BUILD:
            if ('slug' in notification.parent) {
              this.router.navigate(['/builds', notification.parent.slug]);
            }
            break;
        }
        break;
    }
  }
}
