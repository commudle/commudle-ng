import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { IUser } from 'apps/shared-models/user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-network',
  templateUrl: './user-network.component.html',
  styleUrls: ['./user-network.component.scss']
})
export class UserNetworkComponent implements OnInit, OnDestroy {

  user: IUser;
  tabs = [
    {
      title: 'Following',
      responsive: true,
      route: './following'
    },
    {
      title: 'Followers',
      responsive: true,
      route: './followers'
    }
  ];

  subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authWatchService: LibAuthwatchService,
    private usersService: AppUsersService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(() => this.getUserData());
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  // Get user's data
  getUserData() {
    this.usersService.getProfile(this.activatedRoute.snapshot.params.username).subscribe(value => this.user = value);
  }

}
