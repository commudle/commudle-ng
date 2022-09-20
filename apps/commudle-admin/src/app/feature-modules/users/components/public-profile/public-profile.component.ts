import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '@commudle/shared-models';
import { AppUsersService, FooterService, SeoService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';
import { UpdateProfileService } from '../../services/update-profile.service';
import { UserProfileMenuItems, UserProfileMenuService } from '../../services/user-profile-menu.service';

@Component({
  selector: 'commudle-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss'],
})
export class PublicProfileComponent implements OnInit, OnDestroy {
  user: IUser;
  activeMenuItems: UserProfileMenuItems | Record<any, any>;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: AppUsersService,
    private footerService: FooterService,
    private updateProfileService: UpdateProfileService,
    public userProfileMenuService: UserProfileMenuService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe(() => this.getUser()));

    this.footerService.changeFooterStatus(false);

    this.subscriptions.push(
      this.updateProfileService.updateProfile$.subscribe((value) => {
        if (value) {
          this.getUser();
        }
      }),
    );

    this.subscriptions.push(
      this.userProfileMenuService.activeMenuItems$.subscribe((value) => {
        // remove keys with active: false
        this.activeMenuItems = Object.keys(value).reduce((acc, key) => {
          if (value[key].active) {
            acc[key] = value[key];
          }
          return acc;
        }, {});
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());

    this.footerService.changeFooterStatus(true);
  }

  getUser() {
    this.subscriptions.push(
      this.usersService.getProfile(this.activatedRoute.snapshot.params.username).subscribe((data) => {
        this.user = data;
        this.setMeta();
      }),
    );
  }

  setMeta() {
    let title = this.user.name;
    if (this.user.designation) {
      title = title.concat(` - ${this.user.designation.substring(0, 60)}`);
    }
    this.seoService.setTags(title, this.user.about_me, this.user.avatar);
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  };
}
