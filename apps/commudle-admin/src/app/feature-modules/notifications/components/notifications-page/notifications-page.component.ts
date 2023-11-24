import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbToastrService } from '@commudle/theme';
import { NotificationsStore } from 'apps/commudle-admin/src/app/feature-modules/notifications/store/notifications.store';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { ENotificationSenderTypes } from 'apps/shared-models/enums/notification_sender_types.enum';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { IUserStat } from 'libs/shared/models/src/lib/user-stats.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss'],
})
export class NotificationsPageComponent implements OnInit, OnDestroy {
  notificationCount: number;
  trackMarkAllAsRead = false;
  ENotificationSenderTypes = ENotificationSenderTypes;
  currentUser: ICurrentUser;
  userProfileDetails: IUserStat;
  subscriptions: Subscription[] = [];

  constructor(
    private seoService: SeoService,
    private notificationsStore: NotificationsStore,
    private nbToastrService: NbToastrService,
    private gtm: GoogleTagManagerService,
    private authWatchService: LibAuthwatchService,
    private appUsersService: AppUsersService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)),
      this.appUsersService.getProfileStats().subscribe((data) => {
        this.userProfileDetails = data;
      }),
    );
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
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
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
