import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpdateProfileService } from 'projects/commudle-admin/src/app/feature-modules/users/services/update-profile.service';
import {
  UserProfileMenuItems,
  UserProfileMenuService,
} from 'projects/commudle-admin/src/app/feature-modules/users/services/user-profile-menu.service';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { FooterService } from 'projects/commudle-admin/src/app/services/footer.service';
import { IUser } from 'projects/shared-models/user.model';
import { SeoService } from 'projects/shared-services/seo.service';
import { Subscription } from 'rxjs';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { UserProfileManagerService } from 'projects/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss'],
})
export class PublicProfileComponent implements OnInit, OnDestroy {
  user: IUser;
  activeMenuItems: UserProfileMenuItems | {};

  faBuilding = faBuilding;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: AppUsersService,
    private footerService: FooterService,
    private updateProfileService: UpdateProfileService,
    public userProfileMenuService: UserProfileMenuService,
    private seoService: SeoService,
    private userProfileManagerService: UserProfileManagerService,
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
    this.userProfileManagerService.getProfile(this.activatedRoute.snapshot.params.username);
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
