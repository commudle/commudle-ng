import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { CommunityChannelsService } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { CommunityChannelManagerService } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';

@Component({
  selector: 'app-community-channels-dashboard-channel-list',
  templateUrl: './community-channels-dashboard-channel-list.component.html',
  styleUrls: ['./community-channels-dashboard-channel-list.component.scss'],
})
export class CommunityChannelsDashboardChannelListComponent implements OnInit {
  channels: ICommunityChannel[] = [];
  community: ICommunity;
  displayCommunityList = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityChannelsService: CommunityChannelsService,
    private communityChannelManagerService: CommunityChannelManagerService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(() => {
      this.community = this.activatedRoute.snapshot.data.community;
      this.getChannels();
      this.communityChannelManagerService.setCommunityListview(false);
    });
  }

  getChannels() {
    this.communityChannelsService.index(this.community.id).subscribe((data) => {
      this.channels = data.community_channels;
    });
  }

  toggleCommunityListDisplay() {
    this.communityChannelManagerService.setCommunityListview(!this.displayCommunityList);
    this.displayCommunityList = !this.displayCommunityList;
  }
}
