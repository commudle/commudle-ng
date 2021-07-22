import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { IUserRolesUser } from 'projects/shared-models/user_roles_user.model';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';
import { CommunityChannelsService } from '../../services/community-channels.service';
import * as _ from 'lodash';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-channel-members',
  templateUrl: './channel-members.component.html',
  styleUrls: ['./channel-members.component.scss']
})
export class ChannelMembersComponent implements OnInit, OnDestroy {
  EUserRoles = EUserRoles;
  subscriptions = [];
  channel: ICommunityChannel;
  allUsers: IUserRolesUser[] = [];
  page = 1;
  count = 20;
  currentUser: ICurrentUser;
  currentUserIsAdmin = false;

  constructor(
    private communityChannelsService: CommunityChannelsService,
    private communityChannelManagerService: CommunityChannelManagerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private libAuthWatchService: LibAuthwatchService,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit(): void {

    this.subscriptions.push(
      this.libAuthWatchService.currentUser$.subscribe(
        data => {
          this.currentUser = data;
              // find the channel
          if (this.currentUser) {
            this.subscriptions.push(
              this.activatedRoute.parent.params.subscribe(
                data => {
                  this.channel = this.communityChannelManagerService.findChannel(data.community_channel_id);
                  this.getMembers();
                }
              )
            )
          }
        }
      )
    )


  }

  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  // get members
  getMembers() {
    this.communityChannelsService.membersList(this.channel.id, this.page, this.count).subscribe(
      data => {
        this.allUsers = this.allUsers.concat(data.user_roles_users);
        this.page += 1;

        if (data.user_roles_users.length == data.count) {
          this.getMembers();
        } else if (this.allUsers.length > 0) {
          const cUser = this.allUsers.find(k => k.user.username === this.currentUser.username);
          if (cUser) {
            this.currentUserIsAdmin = (cUser.user_role.name === EUserRoles.COMMUNITY_CHANNEL_ADMIN);
          }
        }


      }
    )
  }


  // toggle role
  toggleAdmin(index) {
    // send request to toggle
    const username = this.allUsers[index].user.name;
    let alertMessage;
    let isAdmin = false;
    if(this.allUsers[index].user_role.name === "community_channel_admin") {
      isAdmin = true;
      alertMessage = `Are you sure you want to remove ${username} as admin of ${this.channel.name}?`;
    } else {
      alertMessage = `Are you sure you want to add ${username} as admin of ${this.channel.name}?`;
    }
    if(window.confirm(alertMessage)) {
      this.communityChannelsService.toggleAdmin(this.allUsers[index].id).subscribe(data => {
        this.allUsers[index] = data;
        if(isAdmin) {
          window.location.reload();
        }
      });
    }
  }

  leaveChannel(index) {
    // TODO CHANNEL ask for a confirmation in a dialog
    if(window.confirm(`Are you sure you want to exit ${this.channel.name}?`)) {
      this.communityChannelsService.exitChannel(this.channel.id).subscribe(data => {
        this.allUsers.splice(index, 1);
        this.toastLogService.successDialog('You have exited this channel');
        window.location.reload();
      });
    }
  }

  removeFromChannel(index) {
    // TODO CHANNEL ask for a confirmation in a dialog
    if(window.confirm(`Are you sure you want to remove ${this.allUsers[index].user.name} from ${this.channel.name}?`)) {
      this.communityChannelsService.removeMembership(this.allUsers[index].id).subscribe(data => {
        this.allUsers.splice(index, 1);
        this.toastLogService.successDialog('Removed');
      })
    }
  }


  close() {
    this.router.navigate(['../'])
  }

}
