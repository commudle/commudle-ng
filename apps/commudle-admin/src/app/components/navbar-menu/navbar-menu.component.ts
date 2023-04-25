import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  faBell,
  faBriefcase,
  faFlask,
  faInfo,
  faLightbulb,
  faStar,
  faUser,
  faUserFriends,
  faFileText,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import { NbMenuService, NbPopoverDirective } from '@commudle/theme';
import { NotificationsStore } from 'apps/commudle-admin/src/app/feature-modules/notifications/store/notifications.store';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
})
export class NavbarMenuComponent implements OnInit, OnDestroy {
  currentUser: ICurrentUser;

  faLightbulb = faLightbulb;
  faFlask = faFlask;
  faUserFriends = faUserFriends;
  faBell = faBell;
  faUser = faUser;
  faInfo = faInfo;
  faBriefcase = faBriefcase;
  faStar = faStar;
  faFileText = faFileText;
  faEllipsisV = faEllipsisV;

  notificationCount = 0;
  notificationIconHighlight = false;

  contextMenuItems = [
    { title: 'Jobs', link: '/jobs' },
    { title: 'Pricing', link: '/pricing' },
    { title: 'Blogs', link: '/blogs' },
    { title: 'Documentation', link: '/documentation' },
    { title: 'Newsletters', link: '/newsletters' },
  ];

  subscriptions: Subscription[] = [];

  @ViewChildren(NbPopoverDirective) popovers: QueryList<NbPopoverDirective>;

  constructor(
    private authwatchService: LibAuthwatchService,
    private notificationsStore: NotificationsStore,
    private menuService: NbMenuService,
  ) {}

  ngOnInit(): void {
    this.authwatchService.currentUser$.subscribe((currentUser) => {
      this.currentUser = currentUser;

      if (currentUser) {
        this.getUnreadNotificationsCount();
        this.notificationsStore.updateNotifications();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getUnreadNotificationsCount() {
    this.notificationsStore.getUserNotificationsCount();
    this.notificationsStore.userNotificationCount$.subscribe((count) => {
      this.notificationCount = count;
    });
  }

  closePopover() {
    this.popovers.find((popover) => popover.context === 'notificationsPopover').hide();
  }

  // handleContextMenu(): void {
  //   this.menuService
  //     .onItemClick()
  //     .pipe(
  //       filter(({ tag }) => tag === 'community-member-context-menu'),
  //       map(({ item: title }) => title),
  //     )
  //     .subscribe((menuItem) => {
  //       switch (menuItem.title) {
  //         case 'Unblock':
  //           this.openDialog(this.unblockUserDialog, this.activeContextMenuUser);
  //           break;
  //       }
  //     });
  // }

  // openContextMenu(event) {
  //   event.preventDefault();
  //   this.showContextMenu = true;
  // }

  // closeContextMenu() {
  //   this.showContextMenu = false;
  // }
}
