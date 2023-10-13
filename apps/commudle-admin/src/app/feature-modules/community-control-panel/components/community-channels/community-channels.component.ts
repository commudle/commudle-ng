import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-community-channels',
  templateUrl: './community-channels.component.html',
  styleUrls: ['./community-channels.component.scss'],
})
export class CommunityChannelsComponent implements OnInit {
  community: ICommunity;
  communityId: string;
  subscriptions: Subscription[] = [];
  constructor(private activatedRoute: ActivatedRoute, private communitiesService: CommunitiesService) {}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((data) => {
      this.communityId = data.community_id;
      this.getCommunity();
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getCommunity() {
    this.subscriptions.push(
      this.communitiesService.pGetCommunityDetails(this.communityId).subscribe((data) => {
        this.community = data;
      }),
    );
  }
}
