import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EUserRolesUserStatus, IUserRolesUser } from 'apps/shared-models/user_roles_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { NB_WINDOW, NbMenuService } from '@commudle/theme';
import { filter, map } from 'rxjs/operators';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { UserChatsService } from 'apps/commudle-admin/src/app/feature-modules/user-chats/services/user-chats.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit, OnDestroy {
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

  contextMenuItems = [];
  subscriptions: Subscription[] = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private menuService: NbMenuService,
    private userChatsService: UserChatsService,
    @Inject(NB_WINDOW) private window,
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  getCurrentUser() {
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
        this.setContextMenuItems();
      }),
    );
  }
  setContextMenuItems() {
    this.contextMenuItems = [
      {
        title: 'Profile',
        url: `/users/${this.userRolesUser.user.username}`,
        target: '_blank',
      },
    ];

    if (this.userRolesUser.user.username !== this.currentUser.username) {
      this.contextMenuItems.push({
        title: 'Personal Chat',
      });
    }
    if (this.currentUserIsAdmin) {
      this.userRolesUser.user_role.name !== EUserRoles.COMMUNITY_CHANNEL_ADMIN
        ? this.contextMenuItems.push({ title: 'Make Admin' })
        : this.contextMenuItems.push({ title: 'Remove Admin' });
    }

    if (this.currentUser.username === this.userRolesUser.user.username) {
      this.contextMenuItems.push({
        title: 'Exit Channel',
      });
    } else if (this.currentUserIsAdmin) {
      this.contextMenuItems.push({ title: 'Remove From Channel' });
    }

    this.handleContextMenuItemClick();
  }

  handleContextMenuItemClick() {
    this.subscriptions.push(
      this.menuService
        .onItemClick()
        .pipe(
          filter(({ tag }) => tag === `community-channel-member-menu-${this.userRolesUser.user.username}`),
          map(({ item: title }) => title),
        )
        .subscribe((menuItem) => {
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
        }),
    );
  }

  openChatWithUser(userId: number) {
    this.userChatsService.changeFollowerId(userId);
  }
}
