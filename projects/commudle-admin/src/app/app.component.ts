import {CookieConsentService} from './services/cookie-consent.service';
import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ApiRoutesService} from 'projects/shared-services/api-routes.service';
import {environment} from '../environments/environment';
import {LibAuthwatchService} from 'projects/shared-services/lib-authwatch.service';
import {NbMenuItem, NbSidebarService, NbWindowService, NbWindowState} from '@nebular/theme';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {ICurrentUser} from 'projects/shared-models/current_user.model';
import {Router} from '@angular/router';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {ActionCableConnectionSocket} from 'projects/shared-services/action-cable-connection.socket';
import {AppCentralNotificationService} from './services/app-central-notifications.service';
import {CookieConsentComponent} from '../../../shared-components/cookie-consent/cookie-consent.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sideBarNotifications = false;
  sideBarState = 'collapsed';
  faBars = faBars;
  currentUser: ICurrentUser;
  userContextMenu: NbMenuItem[] = [
    {title: 'Logout', link: '/logout'},
  ];
  cookieAccepted = false;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    private apiRoutes: ApiRoutesService,
    private authWatchService: LibAuthwatchService,
    private actionCableConnectionSocket: ActionCableConnectionSocket,
    private sidebarService: NbSidebarService,
    private titleService: Title,
    private router: Router,
    private windowService: NbWindowService,
    private cookieConsentService: CookieConsentService,
    private appCentralNotificationsService: AppCentralNotificationService
  ) {
    this.checkHTTPS();
    this.apiRoutes.setBaseUrl(environment.base_url);
    this.actionCableConnectionSocket.setBaseUrl(environment.action_cable_url);
    this.titleService.setTitle('Commudle | Developer Communities, Together');
  }

  ngOnInit() {
    this.authWatchService.currentUser$.subscribe(currentUser => {
      this.currentUser = currentUser;

      if (this.currentUser) {
        this.userContextMenu.unshift({
          title: `@${currentUser.username}`,
          link: `/users/${currentUser.username}`,
          badge: {
            text: 'Profile',
            status: 'basic',
          },
        });
      }

      if (this.isBrowser) {
        this.actionCableConnectionSocket.connectToServer();
      }

    });

    this.router.events.subscribe(event => {
      setTimeout(() => {
        if (window.innerWidth <= 1000 && document.getElementById('commudleSidebar').classList.contains('expanded')) {
          this.document.getElementById('commudleSidebar').classList.remove('expanded');
          this.document.getElementById('commudleSidebar').classList.add('collapsed');
          this.sideBarState = 'collapsed';
        }
      }, 10);
    });

    if (!this.cookieConsentService.isCookieConsentAccepted()) {
      this.windowService.open(CookieConsentComponent, {
        title: 'Let\'s Share Cookies!',
        initialState: NbWindowState.MAXIMIZED
      });
    }

    if (this.cookieConsentService.isCookieConsentAccepted()) {
      this.cookieAccepted = true;
    }

    this.checkNotifications();
  }

  checkNotifications() {
    this.sidebarService.onCollapse().subscribe(
      data => {
        this.sideBarState = 'collapsed';
      }
    );

    this.appCentralNotificationsService.sidebarNotifications$.subscribe(
      data => {
        this.sideBarNotifications = data;
      }
    );
  }

  checkHTTPS() {
    if (this.isBrowser) {
      if (environment.production && location.protocol !== 'https:') {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
      }
    }
  }

  toggleSidebar() {
    this.sideBarState = (this.sideBarState === 'collapsed' ? 'expanded' : 'collapsed');
    this.sidebarService.toggle(false, 'mainMenu');
  }

  login() {
    this.document.location.href = `https://auther.commudle.com/?back_to=${encodeURIComponent(window.location.href)}`;
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

  closeSidebarMobile() {
    if (window.innerWidth <= 1000) {
      this.sidebarService.collapse('mainMenu');
    }
  }

}
