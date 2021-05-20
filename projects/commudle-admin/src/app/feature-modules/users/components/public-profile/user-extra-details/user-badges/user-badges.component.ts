import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AppUsersService} from 'projects/commudle-admin/src/app/services/app-users.service';
import {IBadge} from 'projects/shared-models/badge.model';
import {IUser} from 'projects/shared-models/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-badges',
  templateUrl: './user-badges.component.html',
  styleUrls: ['./user-badges.component.scss']
})
export class UserBadgesComponent implements OnInit, OnDestroy {

  @Input() user: IUser;

  badges: IBadge[] = [];

  subscription: Subscription;

  constructor(
    private appUsersService: AppUsersService
  ) {
  }

  ngOnInit(): void {
    this.getBadges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getBadges(): void {
    this.subscription = this.appUsersService.badges(this.user.username).subscribe(value => this.badges = value.badges);
  }

}
