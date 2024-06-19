import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CableService } from '@commudle/shared-services';
import { NbSidebarService, NbSidebarState, NbThemeService } from '@commudle/theme';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { ActionCableConnectionSocket } from 'apps/shared-services/action-cable-connection.socket';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { IsBrowserService } from 'apps/shared-services/is-browser.service';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { CookieConsentService } from './services/cookie-consent.service';
import { ProfileStatusBarService } from './services/profile-status-bar.service';
import { DarkModeService } from 'apps/commudle-admin/src/app/services/dark-mode.service';
import { Subscription } from 'rxjs';
import { SidebarService } from 'apps/shared-components/sidebar/service/sidebar.service';
import { ESidebarPosition, ESidebarWidth } from 'apps/shared-components/sidebar/enum/sidebar.enum';
@Component({
  selector: 'commudle-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewChecked, OnDestroy {
  sideBarState: NbSidebarState = 'collapsed';
  currentUser: ICurrentUser;
  cookieAccepted = false;
  profileBarStatus = true;
  isBrowser;

  isDarkMode = false;
  userTheme;
  systemTheme;
  ESidebarPosition = ESidebarPosition;
  ESidebarWidth = ESidebarWidth;

  private isDarkModeSubscription: Subscription;

  constructor(
    private apiRoutes: ApiRoutesService,
    private authWatchService: LibAuthwatchService,
    private actionCableConnectionSocket: ActionCableConnectionSocket,
    private sidebarService: NbSidebarService,
    private cookieConsentService: CookieConsentService,
    private cdr: ChangeDetectorRef,
    // private notificationsService: NotificationsService,
    // private pioneerAnalyticsService: PioneerAnalyticsService,
    private profileStatusBarService: ProfileStatusBarService,
    private isBrowserService: IsBrowserService,
    private seoService: SeoService,
    private router: Router,
    private cableService: CableService,
    private darkModeService: DarkModeService,
    private themeService: NbThemeService,
    public helpSidebarService: SidebarService,
  ) {
    this.apiRoutes.setBaseUrl(environment.base_url);
    this.actionCableConnectionSocket.setBaseUrl(environment.anycable_url);
    this.isBrowser = this.isBrowserService.isBrowser();
  }

  ngOnInit(): void {
    this.seoService.setCanonical();
    this.authWatchService.currentUser$.subscribe((currentUser: ICurrentUser) => {
      this.currentUser = currentUser;

      if (this.isBrowser) {
        this.cableService.createCable(
          environment.anycable_url + '?user_auth_token=' + this.authWatchService.getAuthCookie(),
        );
        this.actionCableConnectionSocket.connectToServer();
        // this.notificationsService.subscribeToNotifications();

        if (this.currentUser) {
          // this.pioneerAnalyticsService.startAnalytics(this.currentUser.id);
        }
      }
    });
    if (this.cookieConsentService.isCookieConsentAccepted()) {
      this.cookieAccepted = true;
    }

    this.removeSchemaOnRouteChange();
    this.themeCheck();
    this.closeSidebarOnRouteChange();

    this.helpSidebarService.setSidebarVisibility('helpSection', false, true, ESidebarPosition.RIGHT);
  }

  ngAfterViewChecked(): void {
    this.profileStatusBarService.profileBarStatus$.subscribe((value) => (this.profileBarStatus = value));
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    // this.notificationsService.unsubscribeFromNotifications();
    this.isDarkModeSubscription.unsubscribe();
  }

  closeSidebar(): void {
    if (this.sideBarState === 'expanded') {
      this.sidebarService.collapse('mainMenu');
    }
  }

  /**
   * remove the ld+json on route change
   */
  removeSchemaOnRouteChange(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.seoService.removeSchema();
      }
    });
  }

  closeSidebarOnRouteChange(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const isVisible = this.helpSidebarService.getSidebarVisibility('helpSection');
        if (isVisible) {
          this.helpSidebarService.closeSidebar('helpSection');
        }
      }
    });
  }

  themeCheck() {
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    });
    this.userTheme = localStorage.getItem('theme');
    this.systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.themeService.changeTheme(this.isDarkMode ? 'dark' : 'default');
    if (this.userTheme === 'dark' || (!this.userTheme && this.systemTheme)) {
      this.darkModeService.toggleDarkMode(true);
    } else {
      this.darkModeService.toggleDarkMode(false);
    }
  }
}
