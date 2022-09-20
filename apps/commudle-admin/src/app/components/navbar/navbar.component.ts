import { Component, OnInit } from '@angular/core';
import { ICurrentUser } from '@commudle/shared-models';
import { TruncateTextPipe } from '@commudle/shared-pipes';
import { LibAuthwatchService } from '@commudle/shared-services';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NbMenuItem, NbSidebarService, NbSidebarState } from '@nebular/theme';
import { AppCentralNotificationService } from '../../services/app-central-notifications.service';

@Component({
  selector: 'commudle-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUser: ICurrentUser;
  userContextMenu: NbMenuItem[] = [{ title: 'Logout', link: '/logout' }];
  sideBarNotifications = false;
  sideBarState: NbSidebarState;

  faBars = faBars;

  constructor(
    private sidebarService: NbSidebarService,
    private authwatchService: LibAuthwatchService,
    private appCentralNotificationService: AppCentralNotificationService,
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.checkNotifications();
  }

  getUser() {
    this.authwatchService.currentUser$.subscribe((currentUser) => {
      this.currentUser = currentUser;

      if (this.currentUser) {
        this.setContextMenu();
      }
    });
  }

  setContextMenu() {
    const truncatePipe = new TruncateTextPipe();
    if (this.userContextMenu.length <= 1) {
      this.userContextMenu.unshift({
        title: `@${truncatePipe.transform(this.currentUser.username, 10)}`,
        link: `/users/${this.currentUser.username}`,
        badge: {
          text: 'Profile',
          status: 'basic',
        },
      });
    } else {
      this.userContextMenu[0] = {
        title: `@${truncatePipe.transform(this.currentUser.username, 10)}`,
        link: `/users/${this.currentUser.username}`,
        badge: {
          text: 'Profile',
          status: 'basic',
        },
      };
    }
  }

  checkNotifications(): void {
    this.appCentralNotificationService.sidebarNotifications$.subscribe((data) => (this.sideBarNotifications = data));
  }

  toggleSidebar(): void {
    this.sidebarService.toggle(false, 'mainMenu');
  }

  login() {
    window.location.href = `https://auther.commudle.com/?back_to=${encodeURIComponent(window.location.href)}`;
  }
}
