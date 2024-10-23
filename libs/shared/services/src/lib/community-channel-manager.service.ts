import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import {
  EDbModels,
  EDiscussionType,
  ICommunity,
  ICommunityChannel,
  ICommunityGroup,
  IHackathon,
  IUser,
  IUserMessage,
} from '@commudle/shared-models';
import { CommunityChannelsService } from './community-channels.service';
import { ToastrService } from './toastr.service';
import { AppUsersService } from './app-users.service';

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

  // set parent for channel or forum
  private parent: BehaviorSubject<ICommunity | ICommunityGroup | IHackathon> = new BehaviorSubject(null);
  public parent$ = this.parent.asObservable();

  // set parent type for channel or forum
  private parentType: BehaviorSubject<EDbModels> = new BehaviorSubject(null);
  public parentType$ = this.parentType.asObservable();

  // get the roles for the selected community
  private communityRoles: BehaviorSubject<[]> = new BehaviorSubject([]);
  public communityRoles$ = this.communityRoles.asObservable();

  // channelByGroups grouped by their group names
  private channelsByGroups: BehaviorSubject<IGroupedCommunityChannels> = new BehaviorSubject(null);
  public channelsByGroups$ = this.channelsByGroups.asObservable();

  // List of all forums
  private channelsList: BehaviorSubject<ICommunityChannel[]> = new BehaviorSubject([]);
  public channelsList$ = this.channelsList.asObservable();

  // communityForums grouped by their group names
  private forumsByGroup: BehaviorSubject<IGroupedCommunityChannels> = new BehaviorSubject(null);
  public forumsByGroup$ = this.forumsByGroup.asObservable();

  // List of all forums
  private forumsList: BehaviorSubject<ICommunityChannel[]> = new BehaviorSubject([]);
  public forumsList$ = this.forumsList.asObservable();

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
    private toastLogService: ToastrService,
    private usersService: AppUsersService,
  ) {}

  setCurrentUser(user: IUser) {
    this.currentUser = user;
  }

  setParent(parent: ICommunity | ICommunityGroup | IHackathon, parentType: EDbModels): void {
    this.parent.next(parent);
    this.parentType.next(parentType);
  }

  getChannelForum() {
    this.getChannels();
    this.getForums();
    // this.selectedChannel.next(null);
    // if (this.selectedCommunity.value !== community) {
    //   this.selectedCommunity.next(community);
    //   if (this.currentUser) {
    //     this.usersService.getMyRoles('Kommunity', community.id).subscribe((data) => {
    //       this.communityRoles.next(data);
    //     });
    //   }
    // }
  }

  findChannel(channelId): ICommunityChannel {
    const groupedChannels: IGroupedCommunityChannels = this.channelsByGroups.value;
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
    const groupedForums: IGroupedCommunityChannels = this.forumsByGroup.value;
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

  updateChannel(channel: ICommunityChannel) {
    if (channel.display_type === this.discussionType.CHANNEL) {
      if (this.selectedChannel.value.id === channel.id) {
        this.selectedChannel.next(channel);
      }
    }
  }

  setForum(forum) {
    this.selectedForum.next(forum);
  }

  getChannels() {
    this.communityChannelsService
      .indexChannelForum(this.parent.value.id, this.parentType.value, this.discussionType.CHANNEL)
      .subscribe((data) => {
        if (this.channels.length > 0) {
          this.channels = [];
        }
        this.channels = this.channels.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.channelsList.next(this.channels);
        this.getAllChannelRoles(this.channels);
        this.channelsByGroups.next(_.groupBy(this.channels, (ch) => ch.group_name));
      });
  }

  getForums() {
    this.communityChannelsService
      .indexChannelForum(this.parent.value.id, this.parentType.value, this.discussionType.FORUM)
      .subscribe((data) => {
        if (this.forums.length > 0) {
          this.forums = [];
        }
        this.forums = this.forums.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.forumsList.next(this.forums);
        this.getAllForumRoles(this.forums);
        this.forumsByGroup.next(_.groupBy(this.forums, (ch) => ch.group_name));
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

  createChannel(channelData): Promise<boolean> {
    return new Promise((resolve) => {
      this.communityChannelsService
        .createChannelForum(this.parent.value.id, this.parentType.value, channelData)
        .subscribe(
          (data) => {
            if (data) {
              // Select this channel
              this.selectedChannel.next(data);

              // Add this channel to the group in the list of channels
              const allChannels = this.channelsByGroups.value;
              allChannels[data.group_name]
                ? allChannels[data.group_name].push(data)
                : (allChannels[data.group_name] = [data]);
              this.channelsByGroups.next(allChannels);

              // Get channel roles
              this.getChannelRoles(data);

              // Show success toast
              this.toastLogService.successDialog(`${data.name} Created! You are added as an admin`);

              // Resolve the promise with true
              resolve(true);
            } else {
              resolve(false);
            }
          },
          () => {
            resolve(false);
          },
        );
    });
  }

  createForum(forumData): Promise<boolean> {
    return new Promise((resolve) => {
      this.communityChannelsService
        .createChannelForum(this.parent.value.id, this.parentType.value, forumData)
        .subscribe(
          (data) => {
            if (data) {
              const allForums = this.forumsByGroup.value;
              allForums[data.group_name]
                ? allForums[data.group_name].push(data)
                : (allForums[data.group_name] = [data]);
              this.forumsByGroup.next(allForums);
              this.getForumRoles(data);
              this.toastLogService.successDialog(`${data.name} Created! You are added as an admin`);
              resolve(true);
            } else {
              resolve(false);
            }
          },
          () => {
            resolve(false);
          },
        );
    });
  }

  findAndUpdateChannel(channel) {
    // get all the channels
    const groupedChannels: IGroupedCommunityChannels = this.channelsByGroups.value;

    Object.entries(groupedChannels).forEach(([key, values], i) => {
      const ch = values.findIndex((k) => k.id == channel.id);
      if (ch != -1) {
        groupedChannels[key][ch] = channel;
      }
    });
    this.channelsByGroups.next(groupedChannels);
  }

  findAndUpdateForum(forum) {
    // get all the channels
    const groupedForums: IGroupedCommunityChannels = this.forumsByGroup.value;

    Object.entries(groupedForums).forEach(([key, values], i) => {
      const fr = values.findIndex((k) => k.id == forum.id);
      if (fr != -1) {
        groupedForums[key][fr] = forum;
      }
    });
    this.forumsByGroup.next(groupedForums);
  }

  deleteChannel(channelId, archive) {
    this.communityChannelsService.deleteChannelForum(channelId, archive).subscribe((data) => {
      // get all the channels
      const groupedChannels: IGroupedCommunityChannels = this.channelsByGroups.value;
      this.toastLogService.successDialog('Channel was deleted');
      Object.entries(groupedChannels).forEach(([key, values], i) => {
        const ch = values.findIndex((k) => k.id == channelId);
        if (ch != -1) {
          groupedChannels[key].splice(ch, 1);
        }
      });
      this.channelsByGroups.next(groupedChannels);
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
