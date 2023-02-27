import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MainNewslettersService } from 'apps/commudle-admin/src/app/feature-modules/main-newsletters/services/main-newsletters.service';
import { IMainNewsletter } from 'apps/shared-models/main-newsletter.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-newsletter',
  templateUrl: './main-newsletter.component.html',
  styleUrls: ['./main-newsletter.component.scss'],
})
export class MainNewsletterComponent implements OnInit, OnDestroy {
  mainNewsletter: IMainNewsletter;
  sanitizedContent: SafeHtml;

  subscriptions: Subscription[] = [];

  constructor(
    private mainNewslettersService: MainNewslettersService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((data) => {
        if (data.main_newsletter_id) {
          this.getMainNewsletter(data.main_newsletter_id);
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getMainNewsletter(id) {
    this.mainNewslettersService.show(id).subscribe((data) => {
      this.mainNewsletter = data;
      let newsletterContent = data.content.replace(/utm_medium=email/g, 'utm_medium=webapp');
      newsletterContent = newsletterContent.replace(/utm_source=email/g, 'utm_medium=webapp');
      this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(newsletterContent);
      this.setMeta();
    });
  }

  setMeta(): void {
    this.seoService.setTags(
      this.mainNewsletter.title,
      this.mainNewsletter.email_subject,
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
