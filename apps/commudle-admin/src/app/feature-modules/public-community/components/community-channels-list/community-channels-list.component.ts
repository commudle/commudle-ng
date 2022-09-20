import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityChannelsService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { ICommunityChannel } from '@commudle/shared-models';
import { ICommunity } from '@commudle/shared-models';
import { SeoService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-community-channels-list',
  templateUrl: './community-channels-list.component.html',
  styleUrls: ['./community-channels-list.component.scss'],
})
export class CommunityChannelsListComponent implements OnInit, OnDestroy {
  community: ICommunity;
  channels: ICommunityChannel[] = [];
  subscriptions = [];
  channelLoader = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private communityChannelsService: CommunityChannelsService,
  ) {}

  ngOnInit(): void {
    this.channelLoader = true;
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.community = data.community;
        this.getChannels();
        this.seoService.setTitle(`Channels | ${this.community.name}`);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getChannels() {
    this.subscriptions.push(
      this.communityChannelsService.index(this.community.id).subscribe((data) => {
        this.channels = data.community_channels;
        this.channelLoader = false;
      }),
    );
  }
}
