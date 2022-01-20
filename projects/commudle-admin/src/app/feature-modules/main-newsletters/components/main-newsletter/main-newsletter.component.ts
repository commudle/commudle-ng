import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MainNewslettersService } from 'projects/commudle-admin/src/app/feature-modules/main-newsletters/services/main-newsletters.service';
import { IMainNewsletter } from 'projects/shared-models/main-newsletter.model';
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
    private meta: Meta,
    private title: Title,
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
    this.title.setTitle('Commudle IDE | Newsletter for Developers by Developers');
    this.meta.updateTag({ name: 'description', content: `${this.mainNewsletter.email_subject}` });

    this.meta.updateTag({ name: 'og:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({
      name: 'og:image:secure_url',
      content: 'https://commudle.com/assets/images/commudle-logo192.png',
    });
    this.meta.updateTag({ name: 'og:title', content: `Commudle IDE | Newsletter for Developers by Developers` });
    this.meta.updateTag({
      name: 'og:description',
      content: `${this.mainNewsletter.email_subject}`,
    });
    this.meta.updateTag({ name: 'og:type', content: 'website' });

    this.meta.updateTag({ name: 'twitter:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({ name: 'twitter:title', content: `Commudle IDE | Newsletter for Developers by Developers` });
    this.meta.updateTag({
      name: 'twitter:description',
      content: `${this.mainNewsletter.email_subject}`,
    });
  }
}
