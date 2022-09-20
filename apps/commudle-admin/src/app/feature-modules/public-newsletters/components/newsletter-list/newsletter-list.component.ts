import { Component, OnDestroy, OnInit } from '@angular/core';
import { PublicNewslettersService } from 'apps/commudle-admin/src/app/feature-modules/public-newsletters/services/public-newsletters.service';
import { IMainNewsletter } from '@commudle/shared-models';
import { SeoService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-newsletter-list',
  templateUrl: './newsletter-list.component.html',
  styleUrls: ['./newsletter-list.component.scss'],
})
export class NewsletterListComponent implements OnInit, OnDestroy {
  newsletters: IMainNewsletter[] = [];
  subscriptions: Subscription[] = [];

  constructor(private publicNewslettersService: PublicNewslettersService, private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setTags(
      'Commudle IDE: Newsletters from the Community',
      'We publish every month from different activities, events, channels, projects, tutorials and more from the techies, developers & designers around you!',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
    this.getPublishedNewsletters();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getPublishedNewsletters() {
    this.subscriptions.push(
      this.publicNewslettersService.publicIndex().subscribe((data) => {
        this.newsletters = data.main_newsletters;
      }),
    );
  }
}
