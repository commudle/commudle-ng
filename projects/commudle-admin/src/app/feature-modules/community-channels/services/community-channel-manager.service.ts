import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICommunity } from 'projects/shared-models/community.model';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { CommunityChannelsService } from './community-channels.service';
import * as _ from 'lodash';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { AppUsersService } from '../../../services/app-users.service';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';


export interface IGroupedCommunityChannels {
  [groupName: string]: ICommunityChannel[];
}

@Injectable({
  providedIn: 'root'
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


  constructor(
    private communityChannelsService: CommunityChannelsService,
    private toastLogService: LibToastLogService,
    private usersService: AppUsersService,
  ) { }

  setCurrentUser(user: ICurrentUser) {
    this.currentUser = user;
  }

  setCommunity(community: ICommunity) {
    this.selectedCommunity.next(community);

    if (this.currentUser) {
      this.usersService.getMyRoles('Kommunity', community.id).subscribe(
        data => {
          this.communityRoles.next(data);
        }
      );
    }

    this.getChannels();
  }


  findChannel(channelId): ICommunityChannel {
    let groupedChannels: IGroupedCommunityChannels = this.communityChannels.value;
    let chn = null;
    Object.entries(groupedChannels).forEach(
      ([key, values]) => {
        let ch = values.find(k => k.id == channelId);
        if (ch && chn == null) {
          chn = ch;
        }
      }
    );

    return chn;
  }

  setChannel(channel: ICommunityChannel) {
    this.selectedChannel.next(channel);
  }

  getChannels() {
    this.communityChannelsService.index(this.selectedCommunity.value.slug).subscribe(
      data => {
        this.getAllChannelRoles(data.community_channels);
        this.communityChannels.next(_.groupBy(data.community_channels, ch => ch.group_name));
      }
    );
  }


  getAllChannelRoles(channels) {
    if (this.currentUser) {
      let roles = this.allChannelRoles.value;
      for (const [i, ch] of channels.entries()) {
        this.usersService.getMyRoles('CommunityChannel', ch.id).subscribe(
          data => {
            roles[`${ch.id}`] = data;

            if (i === channels.length) {
              this.allChannelRoles.next(roles);
            }
          }
        )
      }
    }
  }

  getChannelRoles(channel) {
    let roles = this.allChannelRoles.value;
    this.usersService.getMyRoles('CommunityChannel', channel.id).subscribe(
      data => {
        roles[`${channel.id}`] = data;
        this.allChannelRoles.next(roles);
      }
    )
  }

  createChannel(channelData) {
    this.communityChannelsService.create(this.selectedCommunity.value.slug, channelData).subscribe(
      data => {
        // select this channel
        this.selectedChannel.next(data);

        // add this channel to the group in the list of channels
        let allChannels = this.communityChannels.value;
        allChannels[data.group_name] ? (allChannels[data.group_name].push(data)) : (allChannels[data.group_name] = [data])
        this.communityChannels.next(allChannels);
        this.getChannelRoles(channelData);
        this.toastLogService.successDialog(`${data.name} Created! You are added as an admin`);
      }
    );
  }


  findAndUpdateChannel(channel) {
    // get all the channels
    let groupedChannels: IGroupedCommunityChannels = this.communityChannels.value;

    Object.entries(groupedChannels).forEach(
      ([key, values], i) => {
        let ch = values.findIndex(k => k.id == channel.id);
        if (ch != -1) {
          groupedChannels[key][ch] = channel;
        }
      }
    );
    this.communityChannels.next(groupedChannels);
  }


  deleteChannel(channelId) {
    this.communityChannelsService.delete(channelId).subscribe(
      data => {
            // get all the channels
        let groupedChannels: IGroupedCommunityChannels = this.communityChannels.value;
        this.toastLogService.successDialog('Channel was deleted');
        Object.entries(groupedChannels).forEach(
          ([key, values], i) => {
            let ch = values.findIndex(k => k.id == channelId);
            if (ch != -1) {
              groupedChannels[key].splice(ch, 1);
            }
          }
        );
        this.communityChannels.next(groupedChannels);

      }
    )

  }

}
