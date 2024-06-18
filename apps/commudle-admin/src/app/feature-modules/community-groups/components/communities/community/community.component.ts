import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { ICommunity } from 'apps/shared-models/community.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent implements OnInit, OnDestroy {
  communityGroup: ICommunityGroup;
  communities: ICommunity[];
  subscriptions: Subscription[] = [];

  isLoading = false;

  count = 10;
  page = 1;
  total = 0;

  constructor(
    private communityGroupsService: CommunityGroupsService,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private communitiesService: CommunitiesService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.getCommunities();
        this.setMeta();
      }),
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getCommunities() {
    this.isLoading = true;
    this.subscriptions.push(
      this.communityGroupsService.communities(this.communityGroup.slug, this.page, this.count).subscribe((data) => {
        this.communities = data.values;
        this.isLoading = false;
        this.total = data.total;
        this.page = data.page;
        this.count = data.count;
      }),
    );
  }

  setMeta() {
    this.seoService.setTags(
      `Communities - Admin - ${this.communityGroup.name}`,
      this.communityGroup.mini_description,
      this.communityGroup.logo.i350,
    );
  }

  toggleEmailVisibility(communityId) {
    this.communitiesService.toggleEmailVisibility(communityId).subscribe();
  }

  togglePaymentEnable(communityId) {
    this.communitiesService.togglePaymentEnable(communityId).subscribe();
  }
}
