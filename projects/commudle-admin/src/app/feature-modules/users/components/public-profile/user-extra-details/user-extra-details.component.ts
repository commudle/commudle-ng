import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private usersService: AppUsersService) {}

  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((data) => this.getUserData(data.username)));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getUserData(username: string) {
    this.subscriptions.push(this.usersService.getProfile(username).subscribe((data) => (this.user = data)));
  }
}
