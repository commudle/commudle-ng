import { CookieConsentService } from './services/cookie-consent.service';
import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { environment } from '../environments/environment';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { NbSidebarService, NbWindowService, NbWindowState } from '@nebular/theme';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { Router } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';
import { UserPersonalDiscussionChatNotificationsChannel } from 'projects/shared-services/websockets/user-personal-discussion-chat-notifications.channel';
import { CookieConsentComponent } from 'projects/shared-components/cookie-consent/cookie-consent.component';
import { AppCentralNotificationService } from './services/app-central-notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  sideBarNotifications = false;
  sideBarState = 'collapsed';

  faBars = faBars;
  currentUser: ICurrentUser;
  userContextMenu = [
    { title: 'Logout', link: '/logout' },
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private apiRoutes: ApiRoutesService,
    private authWatchService: LibAuthwatchService,
    private actionCableConnectionSocket: ActionCableConnectionSocket,
    private sidebarService: NbSidebarService,
    private titleService: Title,
    private router: Router,
    private userNotificationsChannel: UserPersonalDiscussionChatNotificationsChannel,
    private windowService: NbWindowService,
    private cookieConsentService: CookieConsentService,
    private appCentralNotificationsService: AppCentralNotificationService
    ) {
      this.checkHTTPS();
      this.apiRoutes.setBaseUrl(environment.base_url);
      this.actionCableConnectionSocket.setBaseUrl(environment.action_cable_url);
      this.titleService.setTitle("Commudle | Developer Communities, Together");
  }

  ngOnInit() {
    this.authWatchService.currentUser$.subscribe(currentUser => {
      this.currentUser = currentUser;

      if (this.isBrowser) {
        this.actionCableConnectionSocket.connectToServer();
        this.userNotificationsChannel.subscribe();
      }

    });


    this.router.events.subscribe(event => {
      setTimeout(() => {
              if (window.innerWidth <= 1000 && document.getElementById("commudleSidebar").classList.contains('expanded') ) {
                this.document.getElementById("commudleSidebar").classList.remove('expanded');
                this.document.getElementById("commudleSidebar").classList.add('collapsed');
                this.sideBarState = 'collapsed';
              }
          }, 10);
    });

    if (!this.cookieConsentService.isCookieConsentAccepted()) {
      this.windowService.open(CookieConsentComponent, { title: "Let's Share Cookies!", hasBackdrop: false, initialState: NbWindowState.MAXIMIZED});
    }

    this.checkNotifications();
  }


  checkNotifications() {

    this.sidebarService.onCollapse().subscribe(
      data => {
        this.sideBarState = 'collapsed';
      }
    )

    this.appCentralNotificationsService.sidebarNotifications$.subscribe(
      data => {
        this.sideBarNotifications = data;
      }
    )

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
