import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@commudle/shared-models';

@Component({
  selector: 'commudle-user-profile-mini',
  templateUrl: './user-profile-mini.component.html',
  styleUrls: ['./user-profile-mini.component.scss']
})
export class UserProfileMiniComponent implements OnInit {

  @Input() user: IUser;
  @Input() size: string;
  @Input() designation: boolean;
  @Input() showLiveStatus: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
