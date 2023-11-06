import { Component, OnDestroy, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { IUserRolesUser } from 'apps/shared-models/user_roles_user.model';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';
import { CommunityChannelsService } from '../../services/community-channels.service';
import * as _ from 'lodash';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-channel-members',
  templateUrl: './channel-members.component.html',
  styleUrls: ['./channel-members.component.scss'],
})
export class ChannelMembersComponent implements OnInit, OnDestroy {
  @Input() channelOrForum: ICommunityChannel;
  EUserRoles = EUserRoles;
  subscriptions = [];
  // channel: ICommunityChannel;
  channelUsers: IUserRolesUser[] = [];
  allUsers: IUserRolesUser[] = [];
  page = 1;
  count = 10;
  currentUser: ICurrentUser;
  currentUserIsAdmin = false;
  total = 0;
  isLoading = true;
  @Output() closeMembersList = new EventEmitter<number>();

  constructor(
    private communityChannelsService: CommunityChannelsService,
    private libAuthWatchService: LibAuthwatchService,
    private toastLogService: LibToastLogService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.libAuthWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
        this.getMembers();
      }),
    );
  }

  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  // get members
  getMembers() {
    this.isLoading = true;
    this.communityChannelsService.membersList(this.channelOrForum.id, this.page, this.count).subscribe((data) => {
      console.log(
        '🚀 ~ file: channel-members.component.ts:58 ~ ChannelMembersComponent ~ this.communityChannelsService.membersList ~ data:',
        data,
      );
      this.channelUsers = this.channelUsers.concat(data.user_roles_users);
      this.total = data.total;
      this.page += 1;
      this.isLoading = false;
    });
  }

  // toggle role
  toggleAdmin(index) {
    // send request to toggle
    const username = this.allUsers[index].user.name;
    let alertMessage;
    let isAdmin = false;
    if (this.allUsers[index].user_role.name === 'community_channel_admin') {
      isAdmin = true;
      alertMessage = `Are you sure you want to remove ${username} as admin of ${this.channelOrForum.name}?`;
    } else {
      alertMessage = `Are you sure you want to add ${username} as admin of ${this.channelOrForum.name}?`;
    }
    if (window.confirm(alertMessage)) {
      this.communityChannelsService.toggleAdmin(this.allUsers[index].id).subscribe((data) => {
        this.allUsers[index] = data;
        if (isAdmin && this.allUsers[index].id === this.currentUser.id) {
          window.location.reload();
        }
      });
    }
  }

  leaveChannel(index) {
    // TODO CHANNEL ask for a confirmation in a dialog
    if (window.confirm(`Are you sure you want to exit ${this.channelOrForum.name}?`)) {
      this.communityChannelsService.exitChannel(this.channelOrForum.id).subscribe((data) => {
        this.allUsers.splice(index, 1);
        this.toastLogService.successDialog('You have exited this channel');
        window.location.reload();
      });
    }
  }

  removeFromChannel(index) {
    // TODO CHANNEL ask for a confirmation in a dialog
    if (
      window.confirm(
        `Are you sure you want to remove ${this.allUsers[index].user.name} from ${this.channelOrForum.name}?`,
      )
    ) {
      this.communityChannelsService.removeMembership(this.allUsers[index].id).subscribe((data) => {
        this.allUsers.splice(index, 1);
        this.toastLogService.successDialog('Removed');
      });
    }
  }

  close() {
    this.closeMembersList.emit();
  }
}
