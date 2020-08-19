import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { environment } from '../environments/environment';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { NbSidebarService } from '@nebular/theme';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { Router } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';
import { UserNotificationsChannel } from 'projects/shared-services/websockets/user-notifications.channel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private isBrowser: boolean = isPlatformBrowser(this.platformId);

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
    private userNotificationsChannel: UserNotificationsChannel
    ) {
      this.apiRoutes.setBaseUrl(environment.base_url);
      this.actionCableConnectionSocket.setBaseUrl(environment.action_cable_url);
      this.titleService.setTitle("Commudle | Communities | Let's Share & Learn");
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
                }
                if (window.innerWidth >= 1000)  {
                  this.sidebarService.expand('mainMenu');
                }
            }, 10);
      });
  }

  toggleSidebar() {
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
