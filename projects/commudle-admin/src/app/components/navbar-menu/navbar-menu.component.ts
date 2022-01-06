import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faBell, faFlask, faHome, faInfoCircle, faLightbulb, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { NotificationsPopoverComponent } from 'projects/commudle-admin/src/app/feature-modules/notifications/components/notifications-popover/notifications-popover.component';
import { NotificationChannel } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/websockets/notification-channel';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { Subscription } from 'rxjs';

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

  mobileView: boolean;
  notificationCount = 0;

  notificationsPopoverComponent = NotificationsPopoverComponent;

  subscriptions: Subscription[] = [];

  constructor(private notificationChannel: NotificationChannel) {}

  ngOnInit(): void {
    this.mobileView = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    this.receiveData();
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
