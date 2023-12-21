import {
  Component,
  OnDestroy,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { IUserRolesUser } from 'apps/shared-models/user_roles_user.model';
import * as _ from 'lodash';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { CommunityChannelManagerService, CommunityChannelsService } from '@commudle/shared-services';

@Component({
  selector: 'app-channel-members',
  templateUrl: './channel-members.component.html',
  styleUrls: ['./channel-members.component.scss'],
})
export class ChannelMembersComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() channelOrForum: ICommunityChannel;
  @Input() discussionType;
  EUserRoles = EUserRoles;
  subscriptions = [];
  channelUsers: IUserRolesUser[] = [];
  allUsers: IUserRolesUser[] = [];
  page = 1;
  count = 10;
  currentUser: ICurrentUser;
  currentUserIsAdmin = false;
  total = 0;
  isLoading = false;
  @Output() closeMembersList = new EventEmitter<number>();
  channelRoles = {};
  forumsRoles = {};
  @ViewChild('notificationRef') notificationRef: ElementRef;

  constructor(
    private communityChannelsService: CommunityChannelsService,
    private libAuthWatchService: LibAuthwatchService,
    private toastLogService: LibToastLogService,
    private communityChannelManagerService: CommunityChannelManagerService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.libAuthWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
        this.getMembers();
      }),
    );
    if (this.discussionType === 'channel') {
      this.subscriptions.push(
        this.communityChannelManagerService.allChannelRoles$.subscribe((data) => {
          this.channelRoles = data;
          this.channelRoles[this.channelOrForum.id].find((k) => {
            this.currentUserIsAdmin = k === EUserRoles.COMMUNITY_CHANNEL_ADMIN;
          });
        }),
      );
    } else if (this.discussionType === 'forum') {
      this.subscriptions.push(
        this.communityChannelManagerService.allForumRoles$.subscribe((data) => {
          this.forumsRoles = data;
          this.forumsRoles[this.channelOrForum.id].find((k) => {
            this.currentUserIsAdmin = k === EUserRoles.COMMUNITY_CHANNEL_ADMIN;
          });
        }),
      );
    }
  }

  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  ngAfterViewInit() {
    const options = {
      root: null,
      threshold: 1,
    };
    const observer = new IntersectionObserver(this.checkIntersection.bind(this), options);
    observer.observe(this.notificationRef.nativeElement);
  }

  checkIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.getMembers();
      } else {
        this.isLoading = false;
      }
    });
  }

  // get members
  getMembers() {
    if (!this.total || this.channelUsers.length < this.total) {
      this.isLoading = true;
      this.subscriptions.push(
        this.communityChannelsService.membersList(this.channelOrForum.id, this.page, this.count).subscribe((data) => {
          if (data.user_roles_users) {
            this.channelUsers = this.channelUsers.concat(data.user_roles_users);
            this.page = data.page + 1;
            this.total = data.total;
            this.isLoading = false;
          }
        }),
      );
    }
  }

  // toggle role
  toggleAdmin(index) {
    // send request to toggle
    const username = this.channelUsers[index].user.name;
    let alertMessage;
    let isAdmin = false;
    if (this.channelUsers[index].user_role.name === 'community_channel_admin') {
      isAdmin = true;
      alertMessage = `Are you sure you want to remove ${username} as admin of ${this.channelOrForum.name}?`;
    } else {
      alertMessage = `Are you sure you want to add ${username} as admin of ${this.channelOrForum.name}?`;
    }
    if (window.confirm(alertMessage)) {
      this.communityChannelsService.toggleAdmin(this.channelUsers[index].id).subscribe((data) => {
        this.channelUsers[index] = data;
        if (isAdmin && this.channelUsers[index].id === this.currentUser.id) {
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
        `Are you sure you want to remove ${this.channelUsers[index].user.name} from ${this.channelOrForum.name}?`,
      )
    ) {
      this.communityChannelsService.removeMembership(this.channelUsers[index].id).subscribe((data) => {
        this.channelUsers.splice(index, 1);
        this.toastLogService.successDialog('Removed');
      });
    }
  }

  close() {
    this.closeMembersList.emit();
  }
}
