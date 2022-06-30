import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NbSidebarService, NbSidebarState, NbWindowService, NbWindowState } from '@nebular/theme';
import { environment } from 'projects/commudle-admin/src/environments/environment';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { IsBrowserService } from 'projects/shared-services/is-browser.service';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { NotificationsService } from 'projects/shared-services/notifications/notifications.service';
import { PioneerAnalyticsService } from 'projects/shared-services/pioneer-analytics.service';
import { NotificationChannel } from './feature-modules/notifications/services/websockets/notification-channel';
import { ProfileStatusBarService } from './services/profile-status-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewChecked, OnDestroy {
  sideBarState: NbSidebarState = 'collapsed';
  currentUser: ICurrentUser;
  profileBarStatus = true;

  isBrowser = this.isBrowserService.isBrowser();

  constructor(
    private apiRoutes: ApiRoutesService,
    private authWatchService: LibAuthwatchService,
    private actionCableConnectionSocket: ActionCableConnectionSocket,
    private sidebarService: NbSidebarService,
    private cdr: ChangeDetectorRef,
    private notificationsService: NotificationsService,
    private pioneerAnalyticsService: PioneerAnalyticsService,
    private profileStatusBarService: ProfileStatusBarService,
    private notificationChannel: NotificationChannel,
    private isBrowserService: IsBrowserService,
  ) {
    this.apiRoutes.setBaseUrl(environment.base_url);
    this.actionCableConnectionSocket.setBaseUrl(environment.anycable_url);
  }

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((currentUser: ICurrentUser) => {
      this.currentUser = currentUser;

      if (this.isBrowser) {
        this.actionCableConnectionSocket.connectToServer();
        this.notificationsService.subscribeToNotifications();

        if (this.currentUser) {
          this.pioneerAnalyticsService.startAnalytics(this.currentUser.id);
        }
      }
    });
  }

  ngAfterViewChecked(): void {
    this.profileStatusBarService.profileBarStatus$.subscribe((value) => (this.profileBarStatus = value));
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.notificationsService.unsubscribeFromNotifications();
  }

  closeSidebar(): void {
    if (this.sideBarState === 'expanded') {
      this.sidebarService.collapse('mainMenu');
    }
  }
}
