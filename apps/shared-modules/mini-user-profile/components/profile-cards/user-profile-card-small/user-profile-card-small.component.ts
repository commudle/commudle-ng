import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'apps/shared-models/user.model';

@Component({
  selector: 'app-user-profile-card-small',
  templateUrl: './user-profile-card-small.component.html',
  styleUrls: ['./user-profile-card-small.component.scss'],
})
export class UserProfileCardSmallComponent implements OnInit {
  @Input() user: IUser;
  @Input() maxNameLength = 50;
  @Input() disableAnchor: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
