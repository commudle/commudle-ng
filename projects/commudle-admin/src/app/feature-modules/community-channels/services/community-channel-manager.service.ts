import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IUserMessage } from 'projects/shared-models/user_message.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { BehaviorSubject } from 'rxjs';
import { CommunityChannelsService } from './community-channels.service';

export interface IGroupedCommunityChannels {
  [groupName: string]: ICommunityChannel[];
}

@Injectable({
  providedIn: 'root',
})
export class CommunityChannelManagerService {
  private currentUser;

  // community
  private selectedCommunity: BehaviorSubject<ICommunity> = new BehaviorSubject(null);
  public selectedCommunity$ = this.selectedCommunity.asObservable();

  // get the roles for the selected community
  private communityRoles: BehaviorSubject<[]> = new BehaviorSubject([]);
  public communityRoles$ = this.communityRoles.asObservable();

  // communityChannels grouped by their group names
  private communityChannels: BehaviorSubject<IGroupedCommunityChannels> = new BehaviorSubject(null);
  public communityChannels$ = this.communityChannels.asObservable();

  // get the role for all channels
  private allChannelRoles: BehaviorSubject<{}> = new BehaviorSubject({});
  public allChannelRoles$ = this.allChannelRoles.asObservable();
  // channel
  private selectedChannel: BehaviorSubject<ICommunityChannel> = new BehaviorSubject(null);
  public selectedChannel$ = this.selectedChannel.asObservable();

  // to toggle the view of channels list and the list of communities in the sidebar
  private showCommunityList: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public showCommunityList$ = this.showCommunityList.asObservable();

  //pin or unpin message
  private pinData: BehaviorSubject<any> = new BehaviorSubject(null);
  public pinData$ = this.pinData.asObservable();

  private userPermissions: BehaviorSubject<string[]> = new BehaviorSubject([]);
  public userPermissions$ = this.userPermissions.asObservable();

  private scrollToMessage: BehaviorSubject<IUserMessage> = new BehaviorSubject(null);
  public scrollToMessage$ = this.scrollToMessage.asObservable();

  constructor(
    private communityChannelsService: CommunityChannelsService,
    private toastLogService: LibToastLogService,
    private usersService: AppUsersService,
    private router: Router,
  ) {}

  setCurrentUser(user: ICurrentUser) {
    this.currentUser = user;
  }

  setCommunity(community: ICommunity) {
    this.selectedChannel.next(null);
    this.selectedCommunity.next(community);

    if (this.currentUser) {
      this.usersService.getMyRoles('Kommunity', community.id).subscribe((data) => {
        this.communityRoles.next(data);
      });
    }

    this.getChannels();
  }

  findChannel(channelId): ICommunityChannel {
    const groupedChannels: IGroupedCommunityChannels = this.communityChannels.value;
    let chn = null;
    Object.entries(groupedChannels).forEach(([key, values]) => {
      const ch = values.find((k) => k.id == channelId);
      if (ch && chn == null) {
        chn = ch;
      }
    });

    return chn;
  }

  setChannel(channel: ICommunityChannel) {
    this.selectedChannel.next(channel);
  }

  getChannels() {
    this.communityChannelsService.index(this.selectedCommunity.value.slug).subscribe((data) => {
      this.getAllChannelRoles(data.community_channels);
      this.communityChannels.next(_.groupBy(data.community_channels, (ch) => ch.group_name));
    });
  }

  getAllChannelRoles(channels) {
    if (this.currentUser) {
      const roles = this.allChannelRoles.value;
      for (const [i, ch] of channels.entries()) {
        this.usersService.getMyRoles('CommunityChannel', ch.id).subscribe((data) => {
          roles[`${ch.id}`] = data;

          if (i === channels.length) {
            this.allChannelRoles.next(roles);
          }
        });
      }
    }
  }

  getChannelRoles(channel) {
    const roles = this.allChannelRoles.value;
    this.usersService.getMyRoles('CommunityChannel', channel.id).subscribe((data) => {
      roles[`${channel.id}`] = data;
      this.allChannelRoles.next(roles);
    });
  }

  createChannel(channelData) {
    this.communityChannelsService.create(this.selectedCommunity.value.slug, channelData).subscribe((data) => {
      // select this channel
      this.selectedChannel.next(data);

      // add this channel to the group in the list of channels
      const allChannels = this.communityChannels.value;
      allChannels[data.group_name] ? allChannels[data.group_name].push(data) : (allChannels[data.group_name] = [data]);
      this.communityChannels.next(allChannels);
      this.getChannelRoles(data);
      this.toastLogService.successDialog(`${data.name} Created! You are added as an admin`);
    });
  }

  findAndUpdateChannel(channel) {
    // get all the channels
    const groupedChannels: IGroupedCommunityChannels = this.communityChannels.value;

    Object.entries(groupedChannels).forEach(([key, values], i) => {
      const ch = values.findIndex((k) => k.id == channel.id);
      if (ch != -1) {
        groupedChannels[key][ch] = channel;
      }
    });
    this.communityChannels.next(groupedChannels);
  }

  deleteChannel(channelId) {
    this.communityChannelsService.delete(channelId).subscribe((data) => {
      // get all the channels
      const groupedChannels: IGroupedCommunityChannels = this.communityChannels.value;
      this.toastLogService.successDialog('Channel was deleted');
      Object.entries(groupedChannels).forEach(([key, values], i) => {
        const ch = values.findIndex((k) => k.id == channelId);
        if (ch != -1) {
          groupedChannels[key].splice(ch, 1);
        }
      });
      this.communityChannels.next(groupedChannels);
      this.router.navigate(['/communities', this.selectedCommunity.value.slug, 'channels']);
    });
  }

  setCommunityListview(value: boolean) {
    this.showCommunityList.next(value);
  }

  setPinData(data: any) {
    this.pinData.next(data);
  }

  setUserPermissions(permissions) {
    this.userPermissions.next(permissions);
  }

  setScrollToMessage(message: IUserMessage) {
    this.scrollToMessage.next(message);
  }
}
