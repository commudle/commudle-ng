import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@commudle/theme';
import { NotificationsStore } from 'apps/commudle-admin/src/app/feature-modules/notifications/store/notifications.store';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'apps/shared-models/community.model';

@Component({
  selector: 'app-community-admin-notifications',
  templateUrl: './community-admin-notifications.component.html',
  styleUrls: ['./community-admin-notifications.component.scss'],
})
export class CommunityAdminNotificationsComponent implements OnInit {
  communityId;
  community: ICommunity;

  trackMarkAllAsRead = false;
  notificationCount: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communitiesService: CommunitiesService,
    private notificationsStore: NotificationsStore,
    private nbToastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(() => {
      this.communityId = this.activatedRoute.parent.snapshot.params['community_id'];
    });
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
      }
    });
  }
  notificationsCount(communityId) {
    this.notificationsStore.communityNotificationsCount$[communityId].subscribe((count) => {
      this.notificationCount = count;
    });
  }
}
