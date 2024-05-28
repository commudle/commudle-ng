import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ICommunity } from 'apps/shared-models/community.model';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';
import { CommunityChannelsService } from '../../services/community-channels.service';
import { CommunityChannelNotificationsChannel } from '../../services/websockets/community-channel-notifications.channel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.scss'],
})
export class CommunityListComponent implements OnInit, OnDestroy {
  @Input() selectedCommunity: ICommunity;
  communities: ICommunity[];
  channelNotifications = [];
  subscriptions: Subscription[] = [];

  constructor(
    private communityChannelsService: CommunityChannelsService,
    private communityChannelManagerService: CommunityChannelManagerService,
    private communityChannelNotifications: CommunityChannelNotificationsChannel,
  ) {}

  ngOnInit() {
    this.getUserChannelCommunities();

    this.subscriptions.push(
      this.communityChannelNotifications.notifications$.subscribe((data) => {
        this.channelNotifications = data.map((a) => a.kommunity_id);
      }),
      // this.communityChannelManagerService.selectedCommunity$.subscribe((data) => {
      //   this.selectedCommunity = data;
      // }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getUserChannelCommunities() {
    this.subscriptions.push(
      this.communityChannelsService.getUserChannelCommunities().subscribe((data) => {
        this.communities = data.communities;
        if (this.communities.findIndex((k) => k.slug === this.selectedCommunity.slug) == -1) {
          this.communities.unshift(this.selectedCommunity);
        }
      }),
    );
  }
}
