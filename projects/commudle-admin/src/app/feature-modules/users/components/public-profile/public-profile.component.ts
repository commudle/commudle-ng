import {IUser} from 'projects/shared-models/user.model';
import {ActivatedRoute} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppUsersService} from 'projects/commudle-admin/src/app/services/app-users.service';
import {ICurrentUser} from 'projects/shared-models/current_user.model';
import {LibAuthwatchService} from 'projects/shared-services/lib-authwatch.service';
import {Subscription} from 'rxjs';
import {FooterService} from 'projects/commudle-admin/src/app/services/footer.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit, OnDestroy {

  user: IUser;
  currentUser: ICurrentUser;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private authWatchService: LibAuthwatchService,
    private usersService: AppUsersService,
    private footerService: FooterService
  ) {
  }

  ngOnInit(): void {
    // Get user's data
    this.getUserData();

    this.subscriptions.push(this.authWatchService.currentUser$.subscribe(data => this.currentUser = data));

    // Hide Footer
    this.footerService.changeFooterStatus(false);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());

    // Show Footer
    this.footerService.changeFooterStatus(true);
  }

  // Get user's data
  getUserData() {
    this.usersService.getProfile(this.activatedRoute.snapshot.params.username).subscribe(data => this.user = data);
  }
}
