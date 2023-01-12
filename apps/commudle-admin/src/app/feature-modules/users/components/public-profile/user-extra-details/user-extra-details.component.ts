import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileManagerService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { IUser } from 'apps/shared-models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-extra-details',
  templateUrl: './user-extra-details.component.html',
  styleUrls: ['./user-extra-details.component.scss'],
})
export class UserExtraDetailsComponent implements OnInit, OnDestroy {
  user: IUser;
  hiring = false;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: AppUsersService,
    private userProfileManagerService: UserProfileManagerService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((data) => this.getUserData(data.username)));
    this.userProfileManagerService.user$.subscribe((data) => {
      if (data) {
        this.hiring = data.is_employer;
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getUserData(username: string) {
    this.subscriptions.push(
      this.usersService.getProfile(username).subscribe((data) => {
        this.user = data;
      }),
    );
  }
}
