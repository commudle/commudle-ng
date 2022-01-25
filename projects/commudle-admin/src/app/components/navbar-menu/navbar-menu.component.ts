import { Component, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { faBell, faFlask, faHome, faInfoCircle, faLightbulb, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { NbMenuItem, NbPopoverDirective } from '@nebular/theme';
import { NotificationsPopoverComponent } from 'projects/commudle-admin/src/app/feature-modules/notifications/components/notifications-popover/notifications-popover.component';
import { NotificationChannel } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/websockets/notification-channel';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { Subscription } from 'rxjs';
import { NotificationStateService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notification-state.service';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
})
export class NavbarMenuComponent implements OnInit, OnDestroy {
  @Input() currentUser: ICurrentUser;

  faHome = faHome;
  faInfoCircle = faInfoCircle;
  faLightbulb = faLightbulb;
  faFlask = faFlask;
  faUserFriends = faUserFriends;
  faBell = faBell;

  notificationCount = 0;
  notificationsPopoverComponent = NotificationsPopoverComponent;
  @ViewChildren(NbPopoverDirective) popovers: QueryList<NbPopoverDirective>;

  subscriptions: Subscription[] = [];

  homeContextMenu: NbMenuItem[] = [{ title: 'About', link: '/about' }];

  constructor(
    private notificationChannel: NotificationChannel,
    private notificationStateService: NotificationStateService,
  ) {}

  ngOnInit(): void {
    this.receiveData();

    this.notificationStateService.closeNotificationPopover$.subscribe((value) => {
      if (value) {
        this.popovers.forEach((popover) => {
          if (popover.context === 'notificationsPopover') {
            popover.hide();
          }
        });

        this.notificationStateService.setCloseNotificationPopover(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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

  resetCount() {
    if (this.notificationCount > 0) {
      this.notificationCount = 0;
    }
  }
}
