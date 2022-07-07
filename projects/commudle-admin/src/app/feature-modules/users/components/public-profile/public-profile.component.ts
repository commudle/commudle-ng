import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpdateProfileService } from 'projects/commudle-admin/src/app/feature-modules/users/services/update-profile.service';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { FooterService } from 'projects/commudle-admin/src/app/services/footer.service';
import { IUser } from 'projects/shared-models/user.model';
import { SeoService } from 'projects/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss'],
})
export class PublicProfileComponent implements OnInit, OnDestroy {
  user: IUser;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: AppUsersService,
    private footerService: FooterService,
    private updateProfileService: UpdateProfileService,
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
}
