import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpdateProfileService } from 'apps/commudle-admin/src/app/feature-modules/users/services/update-profile.service';
import {
  UserProfileMenuItems,
  UserProfileMenuService,
} from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-menu.service';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { IUser } from 'apps/shared-models/user.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';
import { UserProfileManagerService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss'],
})
export class PublicProfileComponent implements OnInit, OnDestroy {
  user: IUser;
  activeMenuItems: UserProfileMenuItems | any;
  highlight: string;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: AppUsersService,
    private updateProfileService: UpdateProfileService,
    public userProfileMenuService: UserProfileMenuService,
    private seoService: SeoService,
    private userProfileManagerService: UserProfileManagerService,
    private footerService: FooterService,
  ) {}

  ngOnInit(): void {
    this.footerService.changeFooterStatus(true);
    this.checkFragment();

    this.subscriptions.push(this.activatedRoute.params.subscribe(() => this.getUser()));

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
    this.seoService.noIndex(false);
    this.footerService.changeFooterStatus(false);
  }

  checkFragment() {
    this.activatedRoute.fragment.subscribe((fragment) => {
      this.highlight = fragment;
    });
  }

  getUser() {
    this.userProfileManagerService.getProfile(this.activatedRoute.snapshot.params.username);
    this.subscriptions.push(
      this.usersService.getProfile(this.activatedRoute.snapshot.params.username).subscribe((data) => {
        this.user = data;
        this.setSchema();
        if (!this.user.profile_completed || this.user.deactivated) {
          this.seoService.noIndex(true);
        } else {
          this.seoService.noIndex(false);
        }
        this.setMeta();
      }),
    );
  }

  setMeta() {
    let title = this.user.name;
    if (this.user.designation) {
      title = title.concat(` - ${this.user.designation.substring(0, 60)}`);
    }
    const about_me = this.user.about_me ? this.user.about_me : `''`;
    this.seoService.setTags(title, about_me, this.user.avatar);
  }

  originalOrder = (a: KeyValue<string, any>, b: KeyValue<string, any>): number => {
    return 0;
  };

  setSchema() {
    const socialMediaLinks = [
      this.user.medium,
      this.user.behance,
      this.user.dribbble,
      this.user.facebook,
      this.user.github,
      this.user.gitlab,
      this.user.linkedin,
      this.user.personal_website,
      this.user.twitter,
      this.user.youtube,
    ].filter((link) => link !== null && link !== undefined);
    this.seoService.setSchema({
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      dateCreated: this.user.created_at,
      mainEntity: {
        '@type': 'Person',
        name: this.user.name,
        identifier: this.user.username,
        description: this.user.about_me,
        image: this.user.photo.url,
        dateCreated: this.user.created_at,
        sameAs: socialMediaLinks.map((links) => links),
        gender: this.user.gender,
        jobTitle: this.user.designation,
        address: this.user.location,
      },
    });
  }
}
