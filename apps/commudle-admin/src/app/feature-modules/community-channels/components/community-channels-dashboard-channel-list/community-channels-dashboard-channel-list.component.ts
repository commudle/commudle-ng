import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunityChannel } from '@commudle/shared-models';
import { ICommunity } from '@commudle/shared-models';
import { CommunityChannelsService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';

@Component({
  selector: 'commudle-community-channels-dashboard-channel-list',
  templateUrl: './community-channels-dashboard-channel-list.component.html',
  styleUrls: ['./community-channels-dashboard-channel-list.component.scss'],
})
export class CommunityChannelsDashboardChannelListComponent implements OnInit, OnDestroy {
  channels: ICommunityChannel[] = [];
  community: ICommunity;
  displayCommunityList = false;
  subscriptions = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityChannelsService: CommunityChannelsService,
    private communityChannelManagerService: CommunityChannelManagerService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe(() => {
        this.community = this.activatedRoute.snapshot.data.community;
        this.getChannels();
        this.communityChannelManagerService.setCommunityListview(false);
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

  toggleCommunityListDisplay() {
    this.communityChannelManagerService.setCommunityListview(!this.displayCommunityList);
    this.displayCommunityList = !this.displayCommunityList;
  }
}
