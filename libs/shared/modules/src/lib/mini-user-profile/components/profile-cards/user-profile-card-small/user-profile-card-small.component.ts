import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@commudle/shared-models';

@Component({
  selector: 'commudle-user-profile-card-small',
  templateUrl: './user-profile-card-small.component.html',
  styleUrls: ['./user-profile-card-small.component.scss'],
})
export class UserProfileCardSmallComponent implements OnInit {
  @Input() user: IUser;
  @Input() maxNameLength = 50;

  constructor() {}

  ngOnInit(): void {}
}
