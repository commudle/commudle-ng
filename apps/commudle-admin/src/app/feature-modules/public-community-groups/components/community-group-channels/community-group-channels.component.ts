import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'commudle-community-group-channels',
  templateUrl: './community-group-channels.component.html',
  styleUrls: ['./community-group-channels.component.scss'],
})
export class CommunityGroupChannelsComponent implements OnInit, OnDestroy {
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
      this.activatedRoute.parent.data.subscribe((data) => {
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
      `Channels | Admin | ${this.communityGroup.name}`,
      this.communityGroup.mini_description,
      this.communityGroup.logo.i350,
    );
  }
}
