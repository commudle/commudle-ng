import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EUserRolesUserStatus, IUserRolesUser } from 'projects/shared-models/user_roles_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { NbMenuService, NbWindowService, NB_WINDOW } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { UserChatComponent } from 'projects/shared-components/user-chat/user-chat.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit, OnDestroy {
  subscriptions = [];
  @Input() userRolesUser: IUserRolesUser;
  @Input() currentUserIsAdmin: boolean;
  @Output() makeAdmin = new EventEmitter();
  @Output() removeAdmin = new EventEmitter();
  @Output() exitChannel = new EventEmitter();
  @Output() removeFromChannel = new EventEmitter();
  showLiveStatus = false;
  EUserRoles = EUserRoles;
  EUserRolesUserStatus = EUserRolesUserStatus;
  currentUser: ICurrentUser;
  contextMenuClickSubscription;

  contextMenuItems = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private menuService: NbMenuService,
    private windowService: NbWindowService,
    @Inject(NB_WINDOW) private window
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe(
        data => {
          this.currentUser = data;
          if (data) {
            this.showLiveStatus = true;
          } else {
            this.showLiveStatus = false;
          }
          this.setContextMenuItems();
        }
      )
    )
  }

  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }


  setContextMenuItems() {
    this.contextMenuItems = [
      {
        title: 'Profile',
        url: `/users/${this.userRolesUser.user.username}`,
        target: '_blank'
      }
    ];

    if (this.userRolesUser.user.username != this.currentUser.username) {
      this.contextMenuItems.push(
        {
          title: 'Personal Chat'
        }
      );
    }
    console.log(this.currentUserIsAdmin);
    if (this.currentUserIsAdmin) {
      (this.userRolesUser.user_role.name !== EUserRoles.COMMUNITY_CHANNEL_ADMIN) ? (this.contextMenuItems.push({title: 'Make Admin'})) : (this.contextMenuItems.push({title: 'Remove Admin'}))

    }

    if (this.currentUser.username === this.userRolesUser.user.username) {
      this.contextMenuItems.push({
        title: 'Exit Channel'
      });
    } else if (this.currentUserIsAdmin) {
      this.contextMenuItems.push({title: 'Remove From Channel'})
    }

    this.handleContextMenuItemClick();
  }


  handleContextMenuItemClick() {

    if (this.contextMenuClickSubscription) {
      this.contextMenuClickSubscription.unsubscribe();
    }

    this.contextMenuClickSubscription = this.menuService.onItemClick()
    .pipe(
      filter(({tag}) => tag === `community-channel-member-menu-${this.userRolesUser.user.username}`),
      map(({item: title}) => title)
    ).subscribe(
      menuItem => {
        switch (menuItem.title) {
          case 'Personal Chat': {
            this.openChatWithUser(this.userRolesUser.user.id);
            break;
          }
          case 'Make Admin': {
            this.makeAdmin.emit();
            break;
          }
          case 'Remove Admin': {
            this.removeAdmin.emit();
            break;
          }
          case 'Remove From Channel': {
            this.removeFromChannel.emit();
            break;
          }
          case 'Exit Channel': {
            this.exitChannel.emit();
            break;
          }
        }
      }
    )
  }

  openChatWithUser(userId) {
    this.windowService.open(UserChatComponent, {
      title: 'Personal Messages',
      context: {
        discussionUserIds: [userId]
      }
    });
  }

}
