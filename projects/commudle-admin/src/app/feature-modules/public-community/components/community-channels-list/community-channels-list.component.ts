import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'projects/shared-models/community.model';
import { CommunityChannelsService } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';

@Component({
  selector: 'app-community-channels-list',
  templateUrl: './community-channels-list.component.html',
  styleUrls: ['./community-channels-list.component.scss'],
})
export class CommunityChannelsListComponent implements OnInit {
  community: ICommunity;
  channels: ICommunityChannel[] = [];
  subscriptions = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private meta: Meta,
    private title: Title,
    private communityChannelsService: CommunityChannelsService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.community = data.community;
        this.getChannels();
        this.setMeta();
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

  setMeta() {
    this.title.setTitle(`Public Channels | ${this.community.name}`);
    this.meta.updateTag({ name: 'og:title', content: `Public Channels | ${this.community.name}` });
    this.meta.updateTag({ name: 'twitter:title', content: `Public Channels | ${this.community.name}` });
  }
}
