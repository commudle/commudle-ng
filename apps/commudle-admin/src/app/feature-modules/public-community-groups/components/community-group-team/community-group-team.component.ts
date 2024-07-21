import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPageInfo, IUser } from '@commudle/shared-models';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-community-group-team',
  templateUrl: './community-group-team.component.html',
  styleUrls: ['./community-group-team.component.scss'],
})
export class CommunityGroupTeamComponent implements OnInit, OnDestroy {
  communityGroup: ICommunityGroup;
  team: IUser[] = [];
  subscriptions: Subscription[] = [];
  IPageInfo: IPageInfo;
  total = 0;
  limit = 8;
  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private communityGroupsService: CommunityGroupsService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.getTeam();
        this.setMeta();
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  setMeta() {
    this.seoService.setTags(
      `Admin Team | ${this.communityGroup.name}`,
      this.communityGroup.mini_description,
      this.communityGroup.logo.i350,
    );
  }

  getTeam() {
    this.isLoading = true;
    this.subscriptions.push(
      this.communityGroupsService
        .pGetOrganizersAllCommunities(this.communityGroup.slug, this.limit, this.IPageInfo?.end_cursor)
        .subscribe((data) => {
          this.team = this.team.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
          this.IPageInfo = data.page_info;
          this.total = data.total;
          this.isLoading = false;
        }),
    );
  }
}
