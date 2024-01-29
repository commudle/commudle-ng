import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { NbMenuItem, NbSidebarService, NbSidebarState } from '@commudle/theme';
import { AppCentralNotificationService } from 'apps/commudle-admin/src/app/services/app-central-notifications.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { TruncateTextPipe } from 'apps/shared-pipes/truncate-text.pipe';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { DarkModeService } from 'apps/commudle-admin/src/app/services/dark-mode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: ICurrentUser;
  userContextMenu: NbMenuItem[] = [{ title: 'Logout', link: '/logout' }];
  sideBarNotifications = false;
  sideBarState: NbSidebarState;

  faBars = faBars;
  staticAssets = staticAssets;

  isDarkMode = false;
  faSun = faSun;
  faMoon = faMoon;

  private isDarkModeSubscription: Subscription;

  constructor(
    private router: Router,
    private sidebarService: NbSidebarService,
    private authwatchService: LibAuthwatchService,
    private appCentralNotificationService: AppCentralNotificationService,
    private darkModeService: DarkModeService,
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.checkNotifications();
    this.isDarkModeSubscription = this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  ngOnDestroy(): void {
    this.isDarkModeSubscription.unsubscribe();
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

  checkSideBarState(): void {
    this.sidebarService.getSidebarState('mainMenu').subscribe((data) => (this.sideBarState = data));
  }

  toggleSidebar(): void {
    this.sidebarService.toggle(false, 'mainMenu');
  }

  login() {
    this.router.navigate(['/login'], { queryParams: { redirect: this.router.url } });
  }

  toggleDarkMode(isDarkMode: boolean): void {
    this.darkModeService.toggleDarkMode(isDarkMode);
  }
}
