import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { ICommunity } from 'apps/shared-models/community.model';
import { CommunityChannelsService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { EDiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-community-channels-dashboard-channel-list',
  templateUrl: './community-channels-dashboard-channel-list.component.html',
  styleUrls: ['./community-channels-dashboard-channel-list.component.scss'],
})
export class CommunityChannelsDashboardChannelListComponent implements OnInit, OnDestroy {
  @Input() community: ICommunity;
  channels: ICommunityChannel[] = [];
  displayCommunityList = false;
  subscriptions: Subscription[] = [];
  discussionType = EDiscussionType;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityChannelsService: CommunityChannelsService,
    private communityChannelManagerService: CommunityChannelManagerService,
  ) {}

  ngOnInit(): void {
    this.getChannels();
    this.communityChannelManagerService.setCommunityListview(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
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
