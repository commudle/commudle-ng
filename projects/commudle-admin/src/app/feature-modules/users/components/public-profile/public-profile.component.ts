import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { FooterService } from 'projects/commudle-admin/src/app/services/footer.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IUser } from 'projects/shared-models/user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';

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
    private footerService: FooterService,
    private meta: Meta,
    private title: Title
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe(() => this.getUserData()));

    // Get logged in user
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe(data => this.currentUser = data));

    // Hide Footer
    this.footerService.changeFooterStatus(false);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());

    // Show Footer
    this.footerService.changeFooterStatus(true);
    this.meta.removeTag('name=\'robots\'');
  }

  // Get user's data
  getUserData() {
    this.subscriptions.push(this.usersService.getProfile(this.activatedRoute.snapshot.params.username).subscribe(data => {
      this.user = data;
      this.setMeta();
    }));
  }

  setMeta() {
    if (!this.user.is_expert) {
      this.meta.updateTag({ name: 'robots', content: 'noindex' });
    }

    let titleText = this.user.name;

    if (this.user.designation) {
      titleText = titleText.concat(` - ${this.user.designation.substring(0, 60)}`);
    }

    this.title.setTitle(titleText);
    this.meta.updateTag({ name: 'description', content: `${this.user.designation}` });

    this.meta.updateTag({ name: 'og:image', content: this.user.avatar });
    this.meta.updateTag({ name: 'og:image:secure_url', content: this.user.avatar });
    this.meta.updateTag({ name: 'og:title', content: titleText });
    this.meta.updateTag({ name: 'og:description', content: `${this.user.designation}` });
    this.meta.updateTag({ name: 'og:type', content: 'website' });

    this.meta.updateTag({ name: 'twitter:image', content: this.user.avatar });
    this.meta.updateTag({ name: 'twitter:title', content: titleText });
    this.meta.updateTag({ name: 'twitter:description', content: `${this.user.designation}` });
  }

}
