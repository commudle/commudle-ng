import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { faBell, faFlask, faLightbulb, faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { NbPopoverDirective } from '@nebular/theme';
import { NotificationsService } from 'apps/commudle-admin/src/app/feature-modules/notifications/services/notifications.service';
import { NotificationChannel } from 'apps/commudle-admin/src/app/feature-modules/notifications/services/websockets/notification.channel';
import { ICurrentUser } from '@commudle/shared-models';
import { LibAuthwatchService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarMenuComponent implements OnInit, OnDestroy {
  currentUser: ICurrentUser;

  faLightbulb = faLightbulb;
  faFlask = faFlask;
  faUserFriends = faUserFriends;
  faBell = faBell;
  faUser = faUser;

  notificationCount = 0;
  notificationIconHighlight = false;

  subscriptions: Subscription[] = [];

  @ViewChildren(NbPopoverDirective) popovers: QueryList<NbPopoverDirective>;

  constructor(
    private notificationsService: NotificationsService,
    private notificationChannel: NotificationChannel,
    private authwatchService: LibAuthwatchService,
  ) {}

  ngOnInit(): void {
    this.authwatchService.currentUser$.subscribe((currentUser) => {
      this.currentUser = currentUser;

      if (currentUser) {
        this.receiveData();
        this.getUnreadNotificationsCount();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getUnreadNotificationsCount() {
    this.notificationsService.getUnreadNotificationsCount().subscribe((count) => (this.notificationCount = count));
  }

  receiveData() {
    this.subscriptions.push(
      this.notificationChannel.notificationData$.subscribe((data) => {
        if (data) {
          switch (data.action) {
            case this.notificationChannel.ACTIONS.NEW_NOTIFICATION: {
              this.notificationCount++;
            }
          }
        }
      }),
    );
  }

  closePopover() {
    this.popovers.find((popover) => popover.context === 'notificationsPopover').hide();
  }
}
