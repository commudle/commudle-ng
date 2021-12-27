import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faFlask, faHome, faInfoCircle, faLightbulb, faUserFriends, faBell } from '@fortawesome/free-solid-svg-icons';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { NotificationsPopoverComponent } from '../../feature-modules/notifications/components/notifications-popover/notifications-popover.component';
import { NotificationChannel } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/websockets/notification-channel';

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

  subscriptions = [];

  constructor(private notificationChannel: NotificationChannel) {}

  ngOnInit(): void {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.mobileView = true;
    } else {
      this.mobileView = false;
    }

    this.receiveData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  receiveData() {
    this.subscriptions.push(
      this.notificationChannel.notificationData$.subscribe((data) => {
        switch (data?.action) {
          case this.notificationChannel.ACTIONS.NEW_NOTIFICATION: {
            this.notificationCount += 1;
          }
          case this.notificationChannel.ACTIONS.STATUS_UPDATE: {
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
