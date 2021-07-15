import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { IUser } from 'projects/shared-models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-network-list',
  templateUrl: './user-network-list.component.html',
  styleUrls: ['./user-network-list.component.scss']
})
export class UserNetworkListComponent implements OnInit, OnDestroy {

  user: IUser;
  network: IUser[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private appUsersService: AppUsersService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe(() => this.getUserData()));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  // Get user's data
  getUserData() {
    this.subscriptions.push(this.appUsersService.getProfile(this.activatedRoute.parent.snapshot.params.username).subscribe(data => {
      this.user = data;
      this.checkNetworkType();
    }));
  }

  checkNetworkType(): void {
    this.activatedRoute.snapshot.routeConfig.path === 'followers' ? this.getFollowers() : this.getFollowing();
  }

  getFollowers(): void {
    this.subscriptions.push(this.appUsersService.getFollowers(this.user.username).subscribe(value => this.network = value));
  }

  getFollowing(): void {
    this.subscriptions.push(this.appUsersService.getFollowees(this.user.username).subscribe(value => this.network = value));
  }

}
