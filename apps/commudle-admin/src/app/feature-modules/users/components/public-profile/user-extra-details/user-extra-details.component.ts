import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileManagerService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { IUser } from 'apps/shared-models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-extra-details',
  templateUrl: './user-extra-details.component.html',
  styleUrls: ['./user-extra-details.component.scss'],
})
export class UserExtraDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  user: IUser;
  hiring: boolean = false;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: AppUsersService,
    private userProfileManagerService: UserProfileManagerService,
    private route: ActivatedRoute,
    private scroller: ViewportScroller,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((data) => this.getUserData(data.username)));
    this.userProfileManagerService.user$.subscribe((data) => {
      this.hiring = data.is_employer;
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          this.scroller.scrollToAnchor(fragment);
        }, 3000);
      }
    });
  }

  getUserData(username: string) {
    this.subscriptions.push(
      this.usersService.getProfile(username).subscribe((data) => {
        this.user = data;
      }),
    );
  }
}
