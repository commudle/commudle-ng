import { Component, Input, OnInit } from '@angular/core';
import { IUserRolesUser } from '@commudle/shared-models';

@Component({
  selector: 'commudle-user-community-card',
  templateUrl: './user-community-card.component.html',
  styleUrls: ['./user-community-card.component.scss'],
})
export class UserCommunityCardComponent implements OnInit {
  @Input() community: IUserRolesUser;

  constructor() {}

  ngOnInit(): void {}
}
