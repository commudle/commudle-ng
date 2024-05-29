import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { ICommunity } from 'apps/shared-models/community.model';
import { CommunityChannelsService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { EDiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';
import { Subscription } from 'rxjs';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';

@Component({
  selector: 'app-community-channels-dashboard-channel-list',
  templateUrl: './community-channels-dashboard-channel-list.component.html',
  styleUrls: ['./community-channels-dashboard-channel-list.component.scss'],
})
export class CommunityChannelsDashboardChannelListComponent implements OnInit, OnDestroy {
  @Input() parent: ICommunity | ICommunityGroup;
  channels: ICommunityChannel[];
  displayCommunityList = false;
  subscriptions: Subscription[] = [];
  discussionType = EDiscussionType;

  constructor(private communityChannelManagerService: CommunityChannelManagerService) {}

  ngOnInit(): void {
    this.getChannels();
    this.communityChannelManagerService.setCommunityListview(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getChannels() {
    if (this.communityChannelManagerService.channelsList$) {
      this.communityChannelManagerService.channelsList$.subscribe((data) => {
        this.channels = data;
      });
    }
  }

  toggleCommunityListDisplay() {
    this.communityChannelManagerService.setCommunityListview(!this.displayCommunityList);
    this.displayCommunityList = !this.displayCommunityList;
  }
}
