import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IMainNewsletter } from 'projects/shared-models/main-newsletter.model';
import { SeoService } from 'projects/shared-services/seo.service';
import { MainNewslettersService } from '../../services/main-newsletters.service';

@Component({
  selector: 'app-main-newsletter',
  templateUrl: './main-newsletter.component.html',
  styleUrls: ['./main-newsletter.component.scss']
})
export class MainNewsletterComponent implements OnInit, OnDestroy {
  subscriptions = [];
  mainNewsletter: IMainNewsletter;
  sanitizedContent;

  constructor(
    private mainNewslettersService: MainNewslettersService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private seoService : SeoService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe(
        data => {
          if (data.main_newsletter_id) {
            this.getMainNewsletter(data.main_newsletter_id);
          }
        }
      )
    )
  }

  ngOnDestroy() {
    for (let subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  getMainNewsletter(id) {
    this.mainNewslettersService.show(id).subscribe(
      data => {
        this.mainNewsletter = data;
        let newsletterContent = data.content.replace(/utm_medium=email/g, 'utm_medium=webapp');
        newsletterContent = newsletterContent.replace(/utm_source=email/g, 'utm_medium=webapp');
        this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(newsletterContent);
        this.setMeta();
      }
    )
  }

  setMeta(): void {
    this.seoService.setTags(
      'Commudle IDE | Newsletter for Developers by Developers',
      `${this.mainNewsletter.email_subject}`,
      'https://commudle.com/assets/images/commudle-logo192.png'
    );
  }

}
