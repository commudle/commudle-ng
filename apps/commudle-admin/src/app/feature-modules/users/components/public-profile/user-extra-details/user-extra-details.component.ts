import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '@commudle/shared-models';
import { AppUsersService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-user-extra-details',
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
