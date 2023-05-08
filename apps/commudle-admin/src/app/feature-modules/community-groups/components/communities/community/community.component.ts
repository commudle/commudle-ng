import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  communities: ICommunity[] = [];
  subscriptions: Subscription[] = [];

  isLoading = true;

  constructor(
    private communityGroupsService: CommunityGroupsService,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
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
    this.subscriptions.push(
      this.communityGroupsService.communities(this.communityGroup.slug).subscribe((data) => {
        this.communities = this.communities.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.isLoading = false;
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
}
