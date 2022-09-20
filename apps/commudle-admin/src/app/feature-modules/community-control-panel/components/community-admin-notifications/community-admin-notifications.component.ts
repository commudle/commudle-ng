import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ICommunity } from '@commudle/shared-models';

@Component({
  selector: 'commudle-community-admin-notifications',
  templateUrl: './community-admin-notifications.component.html',
  styleUrls: ['./community-admin-notifications.component.scss'],
})
export class CommunityAdminNotificationsComponent implements OnInit {
  communityId;
  community: ICommunity;

  constructor(private activatedRoute: ActivatedRoute, private communitiesService: CommunitiesService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(() => {
      this.communityId = this.activatedRoute.parent.snapshot.params['community_id'];
    });
    this.communitiesService.getCommunityDetails(this.communityId).subscribe((data) => {
      this.community = data;
    });
  }
}
