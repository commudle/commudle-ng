import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityGroupsService } from 'projects/commudle-admin/src/app/services/community-groups.service';
import { ICommunityGroup } from 'projects/shared-models/community-group.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { SeoService } from 'projects/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-community-group-communities',
  templateUrl: './community-group-communities.component.html',
  styleUrls: ['./community-group-communities.component.scss'],
})
export class CommunityGroupCommunitiesComponent implements OnInit, OnDestroy {
  communities: ICommunity[] = [];
  communityGroup: ICommunityGroup;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityGroupsService: CommunityGroupsService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((data) => {
        this.getCommunities(data.community_group_id);
      }),
    );

    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.seoService.setTags(
          this.communityGroup.name,
          this.communityGroup.mini_description,
          this.communityGroup.logo.i350,
        );
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getCommunities(communityGroupId) {
    this.communityGroupsService.pCommunities(communityGroupId).subscribe((data) => {
      this.communities = data.communities;
    });
  }
}
