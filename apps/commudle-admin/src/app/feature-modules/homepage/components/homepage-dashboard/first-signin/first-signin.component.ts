import { Component, Input, OnInit } from '@angular/core';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IUserStat } from 'libs/shared/models/src/lib/user-stats.model';

@Component({
  selector: 'commudle-first-signin',
  templateUrl: './first-signin.component.html',
  styleUrls: ['./first-signin.component.scss'],
})
export class FirstSigninComponent implements OnInit {
  @Input() currentUser: ICurrentUser;
  userProfileDetails: IUserStat;

  constructor(private appUsersService: AppUsersService) {}

  ngOnInit(): void {
    this.appUsersService.getProfileStats().subscribe((data) => {
      this.userProfileDetails = data;
    });
  }
}
