import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPageInfo } from '@commudle/shared-models';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit, OnDestroy {
  channels: ICommunityChannel[] = [];
  subscriptions: Subscription[] = [];
  communityGroup: ICommunityGroup;

  isLoading = false;
  pageInfo: IPageInfo;

  constructor(
    private communityGroupsService: CommunityGroupsService,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.setMeta();
        this.getChannels();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getChannels() {
    this.isLoading = true;
    this.subscriptions.push(
      this.communityGroupsService
        .communityChannels(this.communityGroup.slug, this.pageInfo?.end_cursor)
        .subscribe((data) => {
          this.channels = this.channels.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
          this.isLoading = false;
          this.pageInfo = data.page_info;
        }),
    );
  }

  setMeta() {
    this.seoService.setTags(
      `Channels - Admin - ${this.communityGroup.name}`,
      this.communityGroup.mini_description,
      this.communityGroup.logo.i350,
    );
  }
}
