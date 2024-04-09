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
declare const Razorpay: any;

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

  submit() {
    const options = {
      key: 'rzp_test_AQ8emxZcsJoKdl', // Enter the Key ID generated from the Dashboard
      amount: '5000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'Acme Corp', //your business name
      description: 'Test Transaction',
      image:
        'https://kommunity-app.s3.ap-south-1.amazonaws.com/yj23uqasdnls4gceke4vk0azfyh8?response-content-disposition=inline%3B%20filename%3D%22commudle-logo-full.png%22%3B%20filename%2A%3DUTF-8%27%27commudle-logo-full.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXUMQJEJBCK2EC566%2F20240408%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240408T162157Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=bccc4f5393a0dbda56fb0c5fca8f09a6490c7908a2489530225e121ece0f55ec',
      // order_id: 'order_9A33XWu170gUtm', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: 'https://commudle.com/',
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: 'Gaurav Kumar', //your customer's name
        email: 'gaurav.kumar@example.com',
        contact: '9000090000', //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };
    const rzp1 = new Razorpay(options);
    console.log('🚀 ~ AppComponent ~ submit ~ rzp1:', rzp1);
    // document.getElementById('rzp-button1').onclick = function (e) {
    rzp1.open();
    // e.preventDefault();
    // };
  }
}
