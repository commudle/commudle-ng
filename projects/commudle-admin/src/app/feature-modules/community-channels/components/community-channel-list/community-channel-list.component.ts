import { CommunityChannelNotificationsChannel } from './../../services/websockets/community-channel-notifications.channel';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';

interface EGroupedCommunityChannels {
  [groupName: string]: ICommunityChannel[];
}

@Component({
  selector: 'app-community-channel-list',
  templateUrl: './community-channel-list.component.html',
  styleUrls: ['./community-channel-list.component.scss']
})
export class CommunityChannelListComponent implements OnInit, OnDestroy {
  subscriptions = [];
  groupedChannels: EGroupedCommunityChannels;
  selectedChannel: ICommunityChannel;
  selectedCommunity: ICommunity;
  currentUser: ICurrentUser;
  EUserRoles = EUserRoles;
  communityRoles = [];
  channelsRoles = {};
  channelNotifications = [];

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private authWatchService: LibAuthwatchService,
    private communityChannelNotifications: CommunityChannelNotificationsChannel
  ) { }

  ngOnInit() {

    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe(
        data => {
          this.currentUser = data;
        }
      ),
      this.communityChannelManagerService.selectedCommunity$.subscribe(
        data => {
          this.selectedCommunity = data;
        }
      ),
      this.communityChannelManagerService.communityChannels$.subscribe(
        data => {
          this.groupedChannels = data;
        }
      ),
      this.communityChannelManagerService.communityRoles$.subscribe(
        data => {
          this.communityRoles = data;
        }
      ),
      this.communityChannelManagerService.allChannelRoles$.subscribe(
        data => {
          this.channelsRoles = data;
        }
      ),
      this.communityChannelNotifications.notifications$.subscribe(
        data => {
          this.channelNotifications = data.map(a => a.id);
          this.markRead();
        }
      ),
      this.communityChannelManagerService.selectedChannel$.subscribe(
        data => {
          this.selectedChannel = data;
          this.markRead();
        }
      ),
    )
  }


  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }

  }

  markRead() {
    if (this.selectedChannel && this.channelNotifications.includes(this.selectedChannel.id)) {
      this.communityChannelNotifications.markRead(this.selectedChannel.id);
    }
  }




}
