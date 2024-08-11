import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunityChannel, ICommunityGroup, IPageInfo } from '@commudle/shared-models';
import { SeoService } from '@commudle/shared-services';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-communities-channels',
  templateUrl: './communities-channels.component.html',
  styleUrls: ['./communities-channels.component.scss'],
})
export class CommunitiesChannelsComponent implements OnInit, OnDestroy {
  channels: ICommunityChannel[] = [];
  communityGroup: ICommunityGroup;
  subscriptions: Subscription[] = [];
  page_info: IPageInfo;

  limit = 10;
  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityGroupsService: CommunityGroupsService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.parent.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.getChannels();
        this.setMeta();
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getChannels() {
    this.subscriptions.push(
      this.communityGroupsService
        .pChannels(this.communityGroup.slug, this.limit, this.page_info?.end_cursor)
        .subscribe((data) => {
          this.channels = this.channels.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
          this.page_info = data.page_info;
          this.isLoading = false;
        }),
    );
  }

  setMeta(): void {
    this.seoService.setTags(
      `Channels | ${this.communityGroup.name}`,
      this.communityGroup.mini_description,
      this.communityGroup.logo.i350,
    );
  }
}
