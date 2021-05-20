import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from 'projects/shared-models/user.model';
import {ICurrentUser} from 'projects/shared-models/current_user.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {LibAuthwatchService} from 'projects/shared-services/lib-authwatch.service';
import {AppUsersService} from 'projects/commudle-admin/src/app/services/app-users.service';

@Component({
  selector: 'app-user-extra-details',
  templateUrl: './user-extra-details.component.html',
  styleUrls: ['./user-extra-details.component.scss']
})
export class UserExtraDetailsComponent implements OnInit, OnDestroy {

  user: IUser;
  currentUser: ICurrentUser;
  showBadges = true;

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

    // Get logged in user
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe(data => this.currentUser = data));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  // Get user's data
  getUserData() {
    this.usersService.getProfile(this.activatedRoute.snapshot.params.username).subscribe(data => this.user = data);
  }

  toggleBadges(event: boolean) {
    this.showBadges = event;
  }

}
