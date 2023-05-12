import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'apps/shared-models/community.model';
import { Subscription } from 'rxjs';
import { NotificationsStore } from 'apps/commudle-admin/src/app/feature-modules/notifications/store/notifications.store';
import { NbToastrService } from '@commudle/theme';
import { ENotificationSenderTypes } from 'apps/shared-models/enums/notification_sender_types.enum';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';

@Component({
  selector: 'app-public-community-notifications',
  templateUrl: './public-community-notifications.component.html',
  styleUrls: ['./public-community-notifications.component.scss'],
})
export class PublicCommunityNotificationsComponent implements OnInit, OnDestroy {
  community: ICommunity;
  notificationCount: number;

  trackMarkAllAsRead = false;
  ENotificationSenderTypes = ENotificationSenderTypes;

  subscriptions: Subscription[] = [];
  result;

  constructor(
    private activatedRoute: ActivatedRoute,
    private nbToastrService: NbToastrService,
    private notificationsStore: NotificationsStore,
    private gtm: GoogleTagManagerService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.community = data.community;
        this.notificationsCount(data.community.id);
      }),
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  markAllAsRead() {
    this.notificationsStore.markAllAsRead(this.community.id).subscribe((data) => {
      if (data) {
        this.nbToastrService.success('All notifications marked as read', 'Success');
        this.trackMarkAllAsRead = !this.trackMarkAllAsRead;
        this.notificationsStore.reduceCommunityUnreadNotificationsCount(this.community.id);
        this.gtmService();
      }
    });
  }
  notificationsCount(communityId) {
    this.notificationsStore.communityNotificationsCount$[communityId].subscribe((count) => {
      this.notificationCount = count;
    });
  }

  gtmService() {
    this.gtm.dataLayerPushEvent('click-notification-mark-all-as-read', {
      com_notification_type: this.ENotificationSenderTypes.KOMMUNITY,
    });
  }
}
