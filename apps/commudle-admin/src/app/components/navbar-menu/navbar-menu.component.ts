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
  faBriefcase = faBriefcase;
  faStar = faStar;
  faFileText = faFileText;
  faEllipsisV = faEllipsisV;

  notificationCount = 0;
  notificationIconHighlight = false;

  contextMenuItems;

  // contextMenuItems = [
  //   { title: 'Labs', link: '/labs', icon: 'star' },
  //   { title: 'Jobs', link: '/jobs', icon: 'briefcase' },
  //   { title: 'Newsletters', link: '/newsletters', icon: 'email' },
  //   { title: 'Blogs', link: '/blogs', icon: 'file-text' },
  //   {
  //     title: 'Documentation',
  //     url: 'https://documentation.commudle.com/',
  //     icon: 'file-text',
  //     externalLink: true,
  //     target: '_blank',
  //   },
  // ];

  subscriptions: Subscription[] = [];
  showContextMenu = false;

  @ViewChildren(NbPopoverDirective) popovers: QueryList<NbPopoverDirective>;

  constructor(
    private authwatchService: LibAuthwatchService,
    private notificationsStore: NotificationsStore,
    private menuService: NbMenuService,
    private iconLibraries: NbIconLibraries,
  ) {
    this.iconLibraries.registerSvgPack('my-icons', {
      labs: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>`,
      twitter:
        '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M8 6H4v4h4V6zM4 16h4v-4H4v4zm6 0h4v-4h-4v4zm-1-6H4v4h5v-4zm0-6H4v4h5V4zm9 12h5v-4h-5v4zm0-6h5V6h-5v4zm-1-6H4v4h14V4zm0 12h4v-4h-4v4zm0-6h4V6h-4v4z"/></svg>',
    });
    this.contextMenuItems = [
      {
        title: 'Labs',
        link: '/labs',
        icon: 'labs',
        pack: 'my-icons',
      },
      { title: 'Jobs', link: '/jobs', icon: 'briefcase' },
      { title: 'Newsletters', link: '/newsletters', icon: 'email' },
      { title: 'Blogs', link: '/blogs', icon: 'file-text' },
      {
        title: 'Documentation',
        url: 'https://documentation.commudle.com/',
        icon: 'file-text',
        externalLink: true,
        target: '_blank',
      },
    ];
  }

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
