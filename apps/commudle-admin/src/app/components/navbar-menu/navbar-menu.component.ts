import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  faBell,
  faFlask,
  faLightbulb,
  faUser,
  faUserFriends,
  faEllipsisV,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { NbIconLibraries, NbMenuService, NbPopoverDirective } from '@commudle/theme';
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
  faInfoCircle = faInfoCircle;
  faEllipsisV = faEllipsisV;

  notificationCount = 0;
  notificationIconHighlight = false;

  contextMenuItems = [
    { title: 'Labs', link: '/labs' },
    { title: 'Jobs', link: '/jobs' },
    { title: 'Newsletters', link: '/newsletters' },
    { title: 'Blogs', link: '/blogs' },
    {
      title: 'Documentation',
      url: 'https://documentation.commudle.com/',
      externalLink: true,
      target: '_blank',
    },
  ];

  subscriptions: Subscription[] = [];
  showContextMenu = false;

  @ViewChildren(NbPopoverDirective) popovers: QueryList<NbPopoverDirective>;

  constructor(
    private authwatchService: LibAuthwatchService,
    private notificationsStore: NotificationsStore,
    private menuService: NbMenuService,
    private iconLibraries: NbIconLibraries,
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
}
