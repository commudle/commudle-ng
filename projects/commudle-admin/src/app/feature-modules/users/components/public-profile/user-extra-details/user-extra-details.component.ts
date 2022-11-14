import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserStore } from 'projects/commudle-admin/src/app/feature-modules/users/Store/user.store';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { IUser } from 'projects/shared-models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-extra-details',
  templateUrl: './user-extra-details.component.html',
  styleUrls: ['./user-extra-details.component.scss'],
})
export class UserExtraDetailsComponent implements OnInit, OnDestroy {
  user: IUser;
  hiring: boolean = false;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: AppUsersService,
    private userStore: UserStore,
  ) {}

  ngOnInit(): void {
    this.userStore.userData$.subscribe((data) => {
      console.log(data);
      this.hiring = data.is_employer;
    });
    this.subscriptions.push(this.activatedRoute.params.subscribe((data) => this.getUserData(data.username)));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getUserData(username: string) {
    this.subscriptions.push(this.usersService.getProfile(username).subscribe((data) => (this.user = data)));
  }
}
