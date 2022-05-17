import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommunityChannelManagerService } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { CommunityChannelNotificationsChannel } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/websockets/community-channel-notifications.channel';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { SeoService } from 'projects/shared-services/seo.service';
import { Subscription } from 'rxjs';

interface EGroupedCommunityChannels {
  [groupName: string]: ICommunityChannel[];
}

@Component({
  selector: 'app-community-channel-list',
  templateUrl: './community-channel-list.component.html',
  styleUrls: ['./community-channel-list.component.scss'],
})
export class CommunityChannelListComponent implements OnInit, OnDestroy {
  groupedChannels: EGroupedCommunityChannels;
  selectedChannel: ICommunityChannel;
  selectedCommunity: ICommunity;
  currentUser: ICurrentUser;
  EUserRoles = EUserRoles;
  communityRoles = [];
  channelsRoles = {};
  channelNotifications = [];

  subscriptions: Subscription[] = [];

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private authWatchService: LibAuthwatchService,
    private communityChannelNotifications: CommunityChannelNotificationsChannel,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
      }),
      this.communityChannelManagerService.selectedCommunity$.subscribe((data) => {
        this.selectedCommunity = data;
      }),
      this.communityChannelManagerService.communityChannels$.subscribe((data) => {
        this.groupedChannels = data;
      }),
      this.communityChannelManagerService.communityRoles$.subscribe((data) => {
        this.communityRoles = data;
      }),
      this.communityChannelManagerService.allChannelRoles$.subscribe((data) => {
        this.channelsRoles = data;
      }),
      this.communityChannelNotifications.notifications$.subscribe((data) => {
        this.channelNotifications = data.map((a) => a.id);
        this.markRead();
      }),
      this.communityChannelManagerService.selectedChannel$.subscribe((data) => {
        this.selectedChannel = data;
        if (this.selectedChannel) {
          this.setMeta();
        }
        this.markRead();
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  setMeta() {
    this.seoService.setTags(
      `${this.selectedChannel.name} - ${this.selectedCommunity.name}`,
      `${this.selectedChannel.description.replace(/<[^>]*>/g, '').substring(0, 160)}`,
      this.selectedCommunity.logo_path,
    );
  }

  markRead() {
    if (this.selectedChannel && this.channelNotifications.includes(this.selectedChannel.id)) {
      this.communityChannelNotifications.markRead(this.selectedChannel.id);
    }
  }
}
