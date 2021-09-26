import { Component, Input, OnInit } from '@angular/core';
import { faFlask, faHome, faInfoCircle, faLightbulb, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { ICurrentUser } from 'projects/shared-models/current_user.model';

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

  constructor() {}

  ngOnInit(): void {}
}
