import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from 'projects/shared-models/user.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {LibAuthwatchService} from 'projects/shared-services/lib-authwatch.service';
import {AppUsersService} from 'projects/commudle-admin/src/app/services/app-users.service';

@Component({
  selector: 'app-user-network',
  templateUrl: './user-network.component.html',
  styleUrls: ['./user-network.component.scss']
})
export class UserNetworkComponent implements OnInit, OnDestroy {

  user: IUser;
  tabs: any[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private authWatchService: LibAuthwatchService,
    private usersService: AppUsersService,
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe(data => {
      // Get user's data
      this.getUserData();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  // Get user's data
  getUserData() {
    this.usersService.getProfile(this.activatedRoute.snapshot.params.username).subscribe(data => {
      this.user = data;
      this.buildTabs();
    });
  }

  // Build the tabs to be shown
  buildTabs() {
    this.tabs.push({
      title: 'Following',
      responsive: true,
      route: './following',
    });

    if (this.user.is_expert) {
      this.tabs.push({
        title: 'Followers',
        responsive: true,
        route: './followers',
      });
    }
  }

}
