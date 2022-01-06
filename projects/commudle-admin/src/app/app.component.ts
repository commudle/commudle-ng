import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NbMenuItem, NbSidebarService, NbSidebarState, NbWindowService, NbWindowState } from '@nebular/theme';
import { AppCentralNotificationService } from 'projects/commudle-admin/src/app/services/app-central-notifications.service';
import { FooterService } from 'projects/commudle-admin/src/app/services/footer.service';
import { environment } from 'projects/commudle-admin/src/environments/environment';
import { CookieConsentComponent } from 'projects/shared-components/cookie-consent/cookie-consent.component';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { TruncateTextPipe } from 'projects/shared-pipes/truncate-text.pipe';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { NotificationsService } from 'projects/shared-services/notifications/notifications.service';
import { PioneerAnalyticsService } from 'projects/shared-services/pioneer-analytics.service';
import { NotificationChannel } from './feature-modules/notifications/services/websockets/notification-channel';
import { CookieConsentService } from './services/cookie-consent.service';
import { ProfileStatusBarService } from './services/profile-status-bar.service';

// import * as LogRocket from 'logrocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TruncateTextPipe],
})
export class AppComponent implements OnInit, AfterViewChecked, OnDestroy {
  sideBarNotifications = false;
  sideBarState: NbSidebarState = 'collapsed';
  faBars = faBars;
  currentUser: ICurrentUser;
  userContextMenu: NbMenuItem[] = [{ title: 'Logout', link: '/logout' }];
  cookieAccepted = false;
  footerStatus = true;
  profileBarStatus = true;

  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Record<string, unknown>,
    private apiRoutes: ApiRoutesService,
    private authWatchService: LibAuthwatchService,
    private actionCableConnectionSocket: ActionCableConnectionSocket,
    private sidebarService: NbSidebarService,
    private titleService: Title,
    private router: Router,
    private windowService: NbWindowService,
    private cookieConsentService: CookieConsentService,
    private appCentralNotificationsService: AppCentralNotificationService,
    private footerService: FooterService,
    private cdr: ChangeDetectorRef,
    private truncate: TruncateTextPipe,
    private notificationsService: NotificationsService,
    private pioneerAnalyticsService: PioneerAnalyticsService,
    private profileStatusBarService: ProfileStatusBarService,
    private notificationChannel: NotificationChannel,
  ) {
    // this.checkHTTPS();
    this.apiRoutes.setBaseUrl(environment.base_url);
    this.actionCableConnectionSocket.setBaseUrl(environment.anycable_url);
  }

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((currentUser: ICurrentUser) => {
      this.currentUser = currentUser;

      if (this.currentUser) {
        if (this.userContextMenu.length <= 1) {
          this.userContextMenu.unshift({
            title: `@${this.truncate.transform(currentUser.username, 10)}`,
            link: `/users/${currentUser.username}`,
            badge: {
              text: 'Profile',
              status: 'basic',
            },
          });
        } else {
          this.userContextMenu[0] = {
            title: `@${this.truncate.transform(currentUser.username, 10)}`,
            link: `/users/${currentUser.username}`,
            badge: {
              text: 'Profile',
              status: 'basic',
            },
          };
        }

        // LogRocket.init('g90s8l/commudle');
        // LogRocket.identify(`${this.currentUser.username}`, {
        //   name: `${this.currentUser.name}`,
        //   email: `${this.currentUser.email}`,
        // });
      }

      if (this.isBrowser) {
        this.actionCableConnectionSocket.connectToServer();

        this.notificationsService.subscribeToNotifications();
      }

      if (this.currentUser && this.isBrowser) {
        this.pioneerAnalyticsService.startAnalytics(this.currentUser.id);
      }
    });

    if (this.isBrowser && !this.cookieConsentService.isCookieConsentAccepted()) {
      setTimeout(() => {
        this.windowService.open(CookieConsentComponent, {
          title: "Let's Share Cookies!",
          initialState: NbWindowState.MAXIMIZED,
          windowClass: 'cookie-consent',
        });
      }, 3000);
    }

    if (this.cookieConsentService.isCookieConsentAccepted()) {
      this.cookieAccepted = true;
    }

    this.checkNotifications();
  }

  ngAfterViewChecked(): void {
    this.footerService.footerStatus$.subscribe((value) => (this.footerStatus = value));
    this.profileStatusBarService.profileBarStatus$.subscribe((value) => (this.profileBarStatus = value));
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.notificationsService.unsubscribeFromNotifications();
  }

  checkNotifications(): void {
    this.appCentralNotificationsService.sidebarNotifications$.subscribe(
      (data: boolean) => (this.sideBarNotifications = data),
    );
  }

  // checkHTTPS(): void {
  //   if (this.isBrowser) {
  //     if (environment.production && location.protocol !== 'https:') {
  //       location.replace(`https:${location.href.substring(location.protocol.length)}`);
  //     }
  //   }
  // }

  toggleSidebar(): void {
    this.sidebarService.toggle(false, 'mainMenu');
  }

  closeSidebar(): void {
    if (this.sideBarState === 'expanded') {
      this.sidebarService.collapse('mainMenu');
    }
  }

  login(): void {
    this.document.location.href = `https://auther.commudle.com/?back_to=${encodeURIComponent(window.location.href)}`;
  }
}
