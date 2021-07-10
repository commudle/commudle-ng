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
    if(window.confirm("Are you sure you want to proceed with this action?")){
      this.communityChannelsService.toggleAdmin(this.allUsers[index].id).subscribe(data => {
        this.allUsers[index] = data;
      });
    }
  }

  leaveChannel(index) {
    // TODO CHANNEL ask for a confirmation in a dialog
    if(window.confirm("Are you sure you want to exit the channel?")) {
      this.communityChannelsService.exitChannel(this.channel.id).subscribe(data => {
        this.allUsers.splice(index, 1);
        this.toastLogService.successDialog('You have exited this channel');
      });
    }
  }

  removeFromChannel(index) {
    // TODO CHANNEL ask for a confirmation in a dialog
    if(window.confirm("Do you want to remove this person from channel?")){
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
