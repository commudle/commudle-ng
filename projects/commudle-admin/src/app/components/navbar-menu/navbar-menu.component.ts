import { Component, Input, OnInit } from '@angular/core';
import { faFlask, faHome, faInfoCircle, faLightbulb, faUserFriends, faBell } from '@fortawesome/free-solid-svg-icons';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { NotificationsPopoverComponent } from '../../feature-modules/notifications/components/notifications-popover/notifications-popover.component';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
})
export class NavbarMenuComponent implements OnInit {
  @Input() currentUser: ICurrentUser;

  faHome = faHome;
  faInfoCircle = faInfoCircle;
  faLightbulb = faLightbulb;
  faFlask = faFlask;
  faUserFriends = faUserFriends;
  faBell = faBell;

  viewType: string;

  notificationsPopoverComponent = NotificationsPopoverComponent;

  constructor() {}

  ngOnInit(): void {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.viewType = 'mobile';
    } else {
      this.viewType = 'not-mobile';
    }
  }
}
