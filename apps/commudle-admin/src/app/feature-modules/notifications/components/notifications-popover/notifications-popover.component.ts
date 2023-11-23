import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NbToastrService } from '@commudle/theme';
import { NotificationsStore } from 'apps/commudle-admin/src/app/feature-modules/notifications/store/notifications.store';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { ENotificationSenderTypes } from 'apps/shared-models/enums/notification_sender_types.enum';
import { ENotificationStatuses } from 'apps/shared-models/enums/notification_statuses.enum';
import { INotification } from 'apps/shared-models/notification.model';

@Component({
  selector: 'app-notifications-popover',
  templateUrl: './notifications-popover.component.html',
  styleUrls: ['./notifications-popover.component.scss'],
})
export class NotificationsPopoverComponent implements OnInit {
  isLoading = true;
  @Output() closePopover: EventEmitter<any> = new EventEmitter();

  ENotificationStatuses = ENotificationStatuses;
  ENotificationSenderTypes = ENotificationSenderTypes;
  notificationCount: number;
  trackMarkAllAsRead = false;

  constructor(
    private notificationsStore: NotificationsStore,
    private nbToastrService: NbToastrService,
    private gtm: GoogleTagManagerService,
  ) {}

  ngOnInit(): void {
    this.notificationsCount();
  }

  markAllAsRead() {
    this.notificationsStore.markAllAsRead().subscribe((data) => {
      if (data) {
        this.nbToastrService.success('All notifications marked as read', 'Success');
        this.trackMarkAllAsRead = !this.trackMarkAllAsRead;
        this.notificationsStore.reduceUserUnreadNotificationsCount();
        this.gtmService();
      }
    });
  }

  notificationsCount() {
    this.notificationsStore.userNotificationCount$.subscribe((count) => {
      this.notificationCount = count;
    });
  }

  gtmService() {
    this.gtm.dataLayerPushEvent('click-notification-mark-all-as-read', {
      com_notification_type: this.ENotificationSenderTypes.USER,
    });
  }
}
