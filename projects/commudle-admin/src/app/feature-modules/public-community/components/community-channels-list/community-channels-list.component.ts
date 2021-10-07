import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'projects/shared-models/community.model';
import { CommunityChannelsService } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';

@Component({
  selector: 'app-community-channels-list',
  templateUrl: './community-channels-list.component.html',
  styleUrls: ['./community-channels-list.component.scss'],
})
export class CommunityChannelsListComponent implements OnInit {
  community: ICommunity;
  channels: ICommunityChannel[] = [];
  communityLogo;

  constructor(
    private activatedRoute: ActivatedRoute,
    private meta: Meta,
    private title: Title,
    private communityChannelsService: CommunityChannelsService,
    private communitiesService: CommunitiesService,
  ) {}

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe((data) => {
      this.community = data.community;
      this.getPlaceholder();
      this.getChannels();
      this.setMeta();
    });
  }

  getChannels() {
    this.communityChannelsService.index(this.community.id).subscribe((data) => {
      this.channels = data.community_channels;
    });
  }

  getPlaceholder() {
    this.communitiesService.pGetCommunityDetails(this.community.id).subscribe((data) => {
      this.communityLogo = data.logo_path;
    });
  }

  setMeta() {
    this.title.setTitle(`Public Channels | ${this.community.name}`);
    this.meta.updateTag({ name: 'og:title', content: `Public Channels | ${this.community.name}` });
    this.meta.updateTag({ name: 'twitter:title', content: `Public Channels | ${this.community.name}` });
  }
}
