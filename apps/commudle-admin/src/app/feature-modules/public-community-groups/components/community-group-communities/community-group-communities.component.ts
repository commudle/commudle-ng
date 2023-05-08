import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { ICommunity } from 'apps/shared-models/community.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-community-group-communities',
  templateUrl: './community-group-communities.component.html',
  styleUrls: ['./community-group-communities.component.scss'],
})
export class CommunityGroupCommunitiesComponent implements OnInit, OnDestroy {
  communityGroup: ICommunityGroup;
  communities: ICommunity[] = [];
  subscriptions: Subscription[] = [];

  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityGroupsService: CommunityGroupsService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.getCommunities();
        this.setMeta();
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getCommunities() {
    this.subscriptions.push(
      this.communityGroupsService.pCommunities(this.communityGroup.slug).subscribe((data) => {
        this.communities = data.communities;
        this.isLoading = false;
      }),
    );
  }

  setMeta() {
    this.seoService.setTags(
      `Communities | ${this.communityGroup.name}`,
      this.communityGroup.mini_description,
      this.communityGroup.logo.i350,
    );
  }
}
