import {IUser} from 'projects/shared-models/user.model';
import {ActivatedRoute} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppUsersService} from 'projects/commudle-admin/src/app/services/app-users.service';
import {ICurrentUser} from 'projects/shared-models/current_user.model';
import {LibAuthwatchService} from 'projects/shared-services/lib-authwatch.service';
import {Meta, Title} from '@angular/platform-browser';
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
    private footerService: FooterService,
    private meta: Meta,
    private title: Title
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe(data => {
        // Get user's data
        this.getUserData();
      })
    );

    // Get logged in user
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe(data => this.currentUser = data));

    // Hide Footer
    this.footerService.changeFooterStatus(false);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());

    // Show Footer
    this.footerService.changeFooterStatus(true);
    this.meta.removeTag("name='robots'");

  }

  // Get user's data
  getUserData() {
    this.usersService.getProfile(this.activatedRoute.snapshot.params.username).subscribe(data => {
      this.user = data;
      this.setMeta();
    });
  }

  setMeta() {
    if (!this.user.is_expert) {
      this.meta.updateTag({name: 'robots', content: 'noindex'});
    }

    this.title.setTitle(`${this.user.name}`)
    this.meta.updateTag({name: 'description', content: `${this.user.designation}`});

    this.meta.updateTag({name: 'og:image', content: this.user.avatar});
    this.meta.updateTag({name: 'og:image:secure_url', content: this.user.avatar});
    this.meta.updateTag({name: 'og:title', content: `${this.user.name}`});
    this.meta.updateTag({name: 'og:description', content: `${this.user.designation}`});
    this.meta.updateTag({name: 'og:type', content: 'website'});

    this.meta.updateTag({name: 'twitter:image', content: this.user.avatar});
    this.meta.updateTag({name: 'twitter:title', content: `${this.user.name}`});
    this.meta.updateTag({name: 'twitter:description', content: `${this.user.designation}`});
  }

}
