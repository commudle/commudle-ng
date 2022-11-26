import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  result;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communitiesService: CommunitiesService,
    private notificationsStore: NotificationsStore,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(() => {
      this.communityId = this.activatedRoute.parent.snapshot.params['community_id'];
    });
    this.communitiesService.getCommunityDetails(this.communityId).subscribe((data) => {
      this.community = data;
    });
  }

  markAllAsRead() {
    this.result = this.notificationsStore.markAllAsRead(this.community.id);
    if (this.result) {
      this.trackMarkAllAsRead = !this.trackMarkAllAsRead;
    }
  }
}
