import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'projects/shared-models/user.model';

@Component({
  selector: 'app-user-profile-card-large',
  templateUrl: './user-profile-card-large.component.html',
  styleUrls: ['./user-profile-card-large.component.scss']
})
export class UserProfileCardLargeComponent implements OnInit {

  @Input() user: IUser;
  @Input() maxNameLength = 50;
  @Input() maxUserNameLength = 50;
  @Input() maxDesignationLength = 50;

  constructor() {
  }

  ngOnInit(): void {
  }

}
