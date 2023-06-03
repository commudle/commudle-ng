import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { ICommunity } from 'apps/shared-models/community.model';
import { CommunityChannelsService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { DiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';

@Component({
  selector: 'app-community-channels-dashboard-channel-list',
  templateUrl: './community-channels-dashboard-channel-list.component.html',
  styleUrls: ['./community-channels-dashboard-channel-list.component.scss'],
})
export class CommunityChannelsDashboardChannelListComponent implements OnInit, OnDestroy {
  channels: ICommunityChannel[] = [];
  community: ICommunity;
  displayCommunityList = false;
  subscriptions = [];
  discussionType = DiscussionType;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityChannelsService: CommunityChannelsService,
    private communityChannelManagerService: CommunityChannelManagerService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.community = data.community;
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
      this.communityChannelsService.index(this.community.id, this.discussionType.CHANNEL).subscribe((data) => {
        this.channels = this.channels.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      }),
    );
  }

  toggleCommunityListDisplay() {
    this.communityChannelManagerService.setCommunityListview(!this.displayCommunityList);
    this.displayCommunityList = !this.displayCommunityList;
  }
}
