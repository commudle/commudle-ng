import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '@commudle/shared-models';
import { AppUsersService, SeoService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-user-network-list',
  templateUrl: './user-network-list.component.html',
  styleUrls: ['./user-network-list.component.scss'],
})
export class UserNetworkListComponent implements OnInit, OnDestroy {
  user: IUser;
  network: IUser[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private appUsersService: AppUsersService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe(() => this.getUserData()));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getUserData() {
    this.subscriptions.push(
      this.appUsersService.getProfile(this.activatedRoute.parent.snapshot.params.username).subscribe((data) => {
        this.user = data;
        this.checkNetworkType();
      }),
    );
  }

  checkNetworkType(): void {
    let followerText: string;
    if (this.activatedRoute.snapshot.routeConfig.path === 'followers') {
      followerText = 'following';
      this.getFollowers();
    } else {
      followerText = 'followed by';
      this.getFollowing();
    }
    this.seoService.setTags(
      `People ${followerText} @${this.user.username} / Commudle`,
      `People ${followerText} @${this.user.username} / Commudle`,
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }

  getFollowers(): void {
    this.subscriptions.push(
      this.appUsersService.getFollowers(this.user.username).subscribe((value) => (this.network = value)),
    );
  }

  getFollowing(): void {
    this.subscriptions.push(
      this.appUsersService.getFollowees(this.user.username).subscribe((value) => (this.network = value)),
    );
  }
}
