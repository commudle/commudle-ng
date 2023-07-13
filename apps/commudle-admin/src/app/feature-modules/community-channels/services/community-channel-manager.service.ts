import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { ICommunity } from 'apps/shared-models/community.model';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IUserMessage } from 'apps/shared-models/user_message.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { BehaviorSubject } from 'rxjs';
import { CommunityChannelsService } from './community-channels.service';
import { EDiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';

export interface IGroupedCommunityChannels {
  [groupName: string]: ICommunityChannel[];
}

@Injectable({
  providedIn: 'root',
})
export class CommunityChannelManagerService {
  private currentUser;
  discussionType = EDiscussionType;
  channels: ICommunityChannel[] = [];
  forums: ICommunityChannel[] = [];

  // community
  private selectedCommunity: BehaviorSubject<ICommunity> = new BehaviorSubject(null);
  public selectedCommunity$ = this.selectedCommunity.asObservable();

  // get the roles for the selected community
  private communityRoles: BehaviorSubject<[]> = new BehaviorSubject([]);
  public communityRoles$ = this.communityRoles.asObservable();

  // communityChannels grouped by their group names
  private communityChannels: BehaviorSubject<IGroupedCommunityChannels> = new BehaviorSubject(null);
  public communityChannels$ = this.communityChannels.asObservable();

  // communityForums grouped by their group names
  private communityForums: BehaviorSubject<IGroupedCommunityChannels> = new BehaviorSubject(null);
  public communityForums$ = this.communityForums.asObservable();

  // get the role for all channels
  // eslint-disable-next-line @typescript-eslint/ban-types
  private allChannelRoles: BehaviorSubject<{}> = new BehaviorSubject({});
  public allChannelRoles$ = this.allChannelRoles.asObservable();

  // get the role for all channels
  // eslint-disable-next-line @typescript-eslint/ban-types
  private allForumRoles: BehaviorSubject<{}> = new BehaviorSubject({});
  public allForumRoles$ = this.allForumRoles.asObservable();
  // channel
  private selectedChannel: BehaviorSubject<ICommunityChannel> = new BehaviorSubject(null);
  public selectedChannel$ = this.selectedChannel.asObservable();

  private selectedForum: BehaviorSubject<[]> = new BehaviorSubject(null);
  public selectedForum$ = this.selectedForum.asObservable();

  // to toggle the view of channels list and the list of communities in the sidebar
  private showCommunityList: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public showCommunityList$ = this.showCommunityList.asObservable();

  // to toggle the view of channels list and the list of communities in the sidebar
  private showForumList: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public showForumList$ = this.showForumList.asObservable();

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
    if (this.selectedCommunity.value !== community) {
      this.selectedCommunity.next(community);
      if (this.currentUser) {
        this.usersService.getMyRoles('Kommunity', community.id).subscribe((data) => {
          this.communityRoles.next(data);
        });
      }

      this.getChannels();
      this.getForums();
    }
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

  findForum(forumId): ICommunityChannel {
    const groupedForums: IGroupedCommunityChannels = this.communityChannels.value;
    let frs = null;
    Object.entries(groupedForums).forEach(([key, values]) => {
      const fr = values.find((k) => k.id == forumId);
      if (fr && frs == null) {
        frs = fr;
      }
    });

    return frs;
  }

  setChannel(channel: ICommunityChannel) {
    this.selectedChannel.next(channel);
  }

  setForum(forum) {
    this.selectedForum.next(forum);
  }

  getChannels() {
    this.communityChannelsService
      .index(this.selectedCommunity.value.slug, this.discussionType.CHANNEL)
      .subscribe((data) => {
        if (this.channels.length > 0) {
          this.channels = [];
        }
        this.channels = this.channels.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.getAllChannelRoles(this.channels);
        this.communityChannels.next(_.groupBy(this.channels, (ch) => ch.group_name));
      });
  }

  getForums() {
    this.communityChannelsService
      .index(this.selectedCommunity.value.slug, this.discussionType.FORUM)
      .subscribe((data) => {
        if (this.forums.length > 0) {
          this.forums = [];
        }
        this.forums = this.forums.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.getAllForumRoles(this.forums);
        this.communityForums.next(_.groupBy(this.forums, (ch) => ch.group_name));
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

  getAllForumRoles(forums) {
    if (this.currentUser) {
      const roles = this.allForumRoles.value;
      for (const [i, fr] of forums.entries()) {
        this.usersService.getMyRoles('CommunityChannel', fr.id).subscribe((data) => {
          roles[`${fr.id}`] = data;

          if (i === forums.length) {
            this.allForumRoles.next(roles);
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

  getForumRoles(forum) {
    const roles = this.allForumRoles.value;
    this.usersService.getMyRoles('CommunityChannel', forum.id).subscribe((data) => {
      roles[`${forum.id}`] = data;
      this.allForumRoles.next(roles);
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

  createForum(forumData) {
    this.communityChannelsService.create(this.selectedCommunity.value.slug, forumData).subscribe((data) => {
      // select this channel
      // this.selectedForum.next(data);

      // add this channel to the group in the list of channels
      const allForums = this.communityForums.value;
      allForums[data.group_name] ? allForums[data.group_name].push(data) : (allForums[data.group_name] = [data]);
      this.communityForums.next(allForums);
      this.getForumRoles(data);
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

  findAndUpdateForum(forum) {
    // get all the channels
    const groupedForums: IGroupedCommunityChannels = this.communityForums.value;

    Object.entries(groupedForums).forEach(([key, values], i) => {
      const fr = values.findIndex((k) => k.id == forum.id);
      if (fr != -1) {
        groupedForums[key][fr] = forum;
      }
    });
    this.communityChannels.next(groupedForums);
  }

  deleteChannel(channelId, archive) {
    this.communityChannelsService.delete(channelId, archive).subscribe((data) => {
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
