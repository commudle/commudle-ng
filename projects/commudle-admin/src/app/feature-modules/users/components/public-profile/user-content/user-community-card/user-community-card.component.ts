import {Component, Input, OnInit} from '@angular/core';
import {IUserRolesUser} from 'projects/shared-models/user_roles_user.model';

@Component({
  selector: 'app-user-community-card',
  templateUrl: './user-community-card.component.html',
  styleUrls: ['./user-community-card.component.scss']
})
export class UserCommunityCardComponent implements OnInit {

  @Input() community: IUserRolesUser;

  constructor() {
  }

  ngOnInit(): void {
  }

  getCommunityName(): string {
    const name = this.community.community.name;
    return name.length < 30 ? name : name.substr(0, 30).concat('...');
  }
}
