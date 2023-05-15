import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@commudle/theme';
import { NotificationsStore } from 'apps/commudle-admin/src/app/feature-modules/notifications/store/notifications.store';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { ENotificationSenderTypes } from 'apps/shared-models/enums/notification_sender_types.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-community-admin-notifications',
  templateUrl: './community-admin-notifications.component.html',
  styleUrls: ['./community-admin-notifications.component.scss'],
})
export class CommunityAdminNotificationsComponent implements OnInit, OnDestroy {
  community: ICommunity;
  notificationCount: number;
  communityId;

  trackMarkAllAsRead = false;
  ENotificationSenderTypes = ENotificationSenderTypes;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private communitiesService: CommunitiesService,
    private notificationsStore: NotificationsStore,
    private nbToastrService: NbToastrService,
    private gtm: GoogleTagManagerService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe(() => {
        this.communityId = this.activatedRoute.parent.snapshot.params['community_id'];
      }),
    );
    this.communitiesService.getCommunityDetails(this.communityId).subscribe((data) => {
      this.community = data;
      this.notificationsCount(this.community.id);
    });
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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
