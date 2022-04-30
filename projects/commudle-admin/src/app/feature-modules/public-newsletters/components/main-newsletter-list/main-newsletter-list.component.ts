import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMainNewsletter } from 'projects/shared-models/main-newsletter.model';
import { Subscription } from 'rxjs';
import { PublicNewslettersService } from 'projects/commudle-admin/src/app/feature-modules/public-newsletters/services/public-newsletters.service';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-newsletters',
  templateUrl: './main-newsletter-list.component.html',
  styleUrls: ['./main-newsletter-list.component.scss']
})
export class MainNewsletterList implements OnInit, OnDestroy {

  newsletters: IMainNewsletter[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private publicNewslettersService: PublicNewslettersService,
    private seoService: SeoService,
  ) { }

  ngOnInit(): void {
    this.seoService.setTitle('Commudle IDE: Newsletters from the Community');
    this.seoService.setTag('description', 'We publish every month from different activities, events, channels, projects, tutorials and more from the techies, developers & designers around you!');
    this.getPublishedNewsletters();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getPublishedNewsletters() {
    this.subscriptions.push(
      this.publicNewslettersService.publicIndex().subscribe((data) => {
        this.newsletters = data.main_newsletters;
      })
    )
  }
}
