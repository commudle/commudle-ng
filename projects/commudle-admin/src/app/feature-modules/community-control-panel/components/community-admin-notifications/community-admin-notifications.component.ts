import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { NotificationsService } from '../../../notifications/services/notifications.service';

@Component({
  selector: 'app-community-admin-notifications',
  templateUrl: './community-admin-notifications.component.html',
  styleUrls: ['./community-admin-notifications.component.scss'],
})
export class CommunityAdminNotificationsComponent implements OnInit {
  communityId;
  community: ICommunity;

  trackMarkAllAsRead = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communitiesService: CommunitiesService,
    private notificationsService: NotificationsService,
    private nbToastrService: NbToastrService,
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
    this.notificationsService.markAllAsRead('community', this.community.id).subscribe((result) => {
      if (result) {
        this.nbToastrService.success('All notifications marked as read', 'Success');

        this.trackMarkAllAsRead = !this.trackMarkAllAsRead;
      }
    });
  }
}
