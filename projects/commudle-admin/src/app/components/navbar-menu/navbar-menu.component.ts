import {Component, Input, OnInit} from '@angular/core';
import {ICurrentUser} from 'projects/shared-models/current_user.model';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit {

  @Input() currentUser: ICurrentUser;

  constructor() {
  }

  ngOnInit(): void {
  }

}
