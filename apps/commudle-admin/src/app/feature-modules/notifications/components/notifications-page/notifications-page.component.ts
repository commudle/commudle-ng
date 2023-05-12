import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbToastrService } from '@commudle/theme';
import { NotificationsStore } from 'apps/commudle-admin/src/app/feature-modules/notifications/store/notifications.store';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { ENotificationSenderTypes } from 'apps/shared-models/enums/notification_sender_types.enum';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss'],
})
export class NotificationsPageComponent implements OnInit, OnDestroy {
  notificationCount: number;
  trackMarkAllAsRead = false;
  ENotificationSenderTypes = ENotificationSenderTypes;

  constructor(
    private seoService: SeoService,
    private notificationsStore: NotificationsStore,
    private nbToastrService: NbToastrService,
    private gtm: GoogleTagManagerService,
  ) {}

  ngOnInit(): void {
    this.seoService.noIndex(true);
    this.notificationsCount();
    this.seoService.setTags(
      'Notifications',
      'View all notifications',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }

  ngOnDestroy(): void {
    this.seoService.noIndex(false);
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
    this.gtm.dataLayerPushEvent('mark-all-as-read', { com_notification_type: this.ENotificationSenderTypes.USER });
  }
}
