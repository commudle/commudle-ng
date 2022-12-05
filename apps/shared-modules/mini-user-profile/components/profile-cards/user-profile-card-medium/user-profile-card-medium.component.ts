import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'apps/shared-models/user.model';

@Component({
  selector: 'app-user-profile-card-medium',
  templateUrl: './user-profile-card-medium.component.html',
  styleUrls: ['./user-profile-card-medium.component.scss'],
})
export class UserProfileCardMediumComponent implements OnInit {
  @Input() user: IUser;
  @Input() maxNameLength = 50;
  @Input() maxDesignationLength = 50;

  constructor() {}

  ngOnInit(): void {}
}
