import { Component, OnDestroy, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';
import { CommunityChannelManagerService, CommunityChannelsService, ToastrService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';
import { EUserRoles, ICommunityChannel, IPageInfo, IUser, IUserRolesUser } from '@commudle/shared-models';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';

@Component({
  selector: 'app-channel-members',
  templateUrl: './channel-members.component.html',
  styleUrls: ['./channel-members.component.scss'],
})
export class ChannelMembersComponent implements OnInit, OnDestroy, OnChanges {
  @Input() channelOrForum: ICommunityChannel;
  @Input() discussionType;
  subscriptions: Subscription[] = [];
  EUserRoles = EUserRoles;
  channelMembers: IUserRolesUser[] = [];
  admins: IUserRolesUser[] = [];
  allUsers: IUserRolesUser[] = [];
  currentUser: IUser;
  currentUserIsAdmin = false;
  isLoading = false;
  @Output() closeMembersList = new EventEmitter<number>();
  channelRoles = {};
  forumsRoles = {};
  isSuperAdmin = true;

  pageInfo: IPageInfo;
  totalMembers = 0;
  totalOrganizers = 0;

  constructor(
    private communityChannelsService: CommunityChannelsService,
    private libAuthWatchService: LibAuthwatchService,
    private toastrService: ToastrService,
    private communityChannelManagerService: CommunityChannelManagerService,
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();

    // get roles as per discussion type
    if (this.discussionType === 'channel') {
      this.getChannelRoles();
    } else if (this.discussionType === 'forum') {
      this.getForumsRoles();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  ngOnChanges(): void {
    this.channelMembers = [];
    this.admins = [];
    this.getAdmins();
    this.getMembers();
  }

  // details of current user
  getCurrentUser() {
    this.subscriptions.push(
      this.libAuthWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
        if (this.currentUser.user_roles.includes(EUserRoles.SYSTEM_ADMINISTRATOR)) {
          this.isSuperAdmin = true;
        }
      }),
    );
  }

  // get roles of channels and check admin for forums
  getChannelRoles() {
    this.subscriptions.push(
      this.communityChannelManagerService.allChannelRoles$.subscribe((data) => {
        this.channelRoles = data;
        this.channelRoles[this.channelOrForum.id].find((k) => {
          this.currentUserIsAdmin = k === EUserRoles.COMMUNITY_CHANNEL_ADMIN;
        });
      }),
    );
  }

  // get roles of forums and check admin for forums
  getForumsRoles() {
    this.subscriptions.push(
      this.communityChannelManagerService.allForumRoles$.subscribe((data) => {
        this.forumsRoles = data;
        if (this.forumsRoles[this.channelOrForum.id]) {
          this.forumsRoles[this.channelOrForum.id].find((k) => {
            this.currentUserIsAdmin = k === EUserRoles.COMMUNITY_CHANNEL_ADMIN;
          });
        }
      }),
    );
  }

  // get members only not admins
  getMembers() {
    if (!this.isLoading) {
      this.isLoading = true;
      this.subscriptions.push(
        this.communityChannelsService
          .channelForumMembersIndex(this.channelOrForum.id, this.pageInfo?.end_cursor)
          .subscribe((data) => {
            this.channelMembers = this.channelMembers.concat(
              data.page.reduce((acc, value) => [...acc, value.data], []),
            );
            this.pageInfo = data.page_info;
            this.totalMembers = data.total;
            this.isLoading = false;
          }),
      );
    }
  }

  // get admin of channels not members
  getAdmins() {
    this.subscriptions.push(
      this.communityChannelsService.getChannelAdmins(this.channelOrForum.id).subscribe((data) => {
        this.admins = this.admins.concat(data.user_roles_users);
        this.totalOrganizers = data.total;
      }),
    );
  }

  //make admin
  addAdmin(index: number, userRolesUserId: number) {
    const username = this.channelMembers[index].user.name;
    const alertMessage = `Are you sure you want to Add ${username} as admin of ${this.channelOrForum.name}?`;
    if (window.confirm(alertMessage)) {
      this.communityChannelsService.memberToggleAdmin(userRolesUserId).subscribe((data) => {
        this.channelMembers.splice(index, 1);
        this.admins.push(data);
      });
    }
  }

  // remove from admin
  removeAdmin(index: number, userRolesUserId: number) {
    const username = this.admins[index].user.name;
    const alertMessage = `Are you sure you want to Remove ${username} as admin of ${this.channelOrForum.name}?`;
    if (window.confirm(alertMessage)) {
      this.communityChannelsService.memberToggleAdmin(userRolesUserId).subscribe((data) => {
        this.admins.splice(index, 1);
        this.channelMembers.unshift(data);
      });
    }
  }

  leaveChannel(index) {
    if (window.confirm(`Are you sure you want to exit ${this.channelOrForum.name}?`)) {
      this.communityChannelsService.memberExitChannel(this.channelOrForum.id).subscribe((data) => {
        this.allUsers.splice(index, 1);
        this.toastrService.successDialog('You have exited this channel');
        window.location.reload();
      });
    }
  }

  removeFromChannel(index) {
    let userName = '';
    let isAdmin = false;
    let userRolesUserId = 0;

    if (this.channelMembers[index]) {
      userName = this.channelMembers[index].user.name;
      userRolesUserId = this.channelMembers[index].id;
    }
    if (this.admins[index]) {
      userName = this.admins[index].user.name;
      userRolesUserId = this.admins[index].id;
      isAdmin = true;
    }
    if (window.confirm(`Are you sure you want to remove ${userName} from ${this.channelOrForum.name}?`)) {
      this.communityChannelsService.removeMemberFromChannelForum(userRolesUserId).subscribe((data) => {
        if (data) {
          if (isAdmin) {
            this.admins.splice(index, 1);
          } else {
            this.channelMembers.splice(index, 1);
          }
          this.toastrService.successDialog('Removed');
          this.totalMembers = -1;
        }
      });
    }
  }

  close() {
    this.closeMembersList.emit();
  }
}
