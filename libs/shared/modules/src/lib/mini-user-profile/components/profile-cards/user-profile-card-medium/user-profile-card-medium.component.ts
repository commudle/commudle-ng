import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@commudle/shared-models';

@Component({
  selector: 'commudle-user-profile-card-medium',
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
