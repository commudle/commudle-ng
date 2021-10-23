import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { CommunityChannelsService } from '../../services/community-channels.service';

@Component({
  selector: 'app-community-channels-dashboard-channel-list',
  templateUrl: './community-channels-dashboard-channel-list.component.html',
  styleUrls: ['./community-channels-dashboard-channel-list.component.scss'],
})
export class CommunityChannelsDashboardChannelListComponent implements OnInit {
  channels: ICommunityChannel[] = [];
  communityLogo;
  communityId;
  community: ICommunity;

  constructor(private activatedRoute: ActivatedRoute, private communityChannelsService: CommunityChannelsService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(() => {
      this.community = this.activatedRoute.snapshot.data.community;
      this.communityId = this.community.id;
      this.communityLogo = this.community.logo_path;
      this.getChannels();
    });
  }

  getChannels() {
    this.communityChannelsService.index(this.communityId).subscribe((data) => {
      this.channels = data.community_channels;
    });
  }
}
