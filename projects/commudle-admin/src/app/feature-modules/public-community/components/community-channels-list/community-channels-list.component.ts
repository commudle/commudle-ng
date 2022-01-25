import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityChannelsService } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-community-channels-list',
  templateUrl: './community-channels-list.component.html',
  styleUrls: ['./community-channels-list.component.scss'],
})
export class CommunityChannelsListComponent implements OnInit, OnDestroy {
  community: ICommunity;
  channels: ICommunityChannel[] = [];
  subscriptions = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private communityChannelsService: CommunityChannelsService,
  ) {}

  ngOnInit(): void {
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
      }),
    );
  }
}
