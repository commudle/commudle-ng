import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'apps/shared-models/user.model';

@Component({
  selector: 'app-user-profile-mini',
  templateUrl: './user-profile-mini.component.html',
  styleUrls: ['./user-profile-mini.component.scss'],
})
export class UserProfileMiniComponent implements OnInit {
  @Input() user: IUser;
  @Input() size: string;
  @Input() designation: boolean;
  @Input() disableAnchor: boolean = false;
  @Input() showLiveStatus: boolean;

  constructor() {}

  ngOnInit() {}
}
