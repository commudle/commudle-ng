import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from '@commudle/shared-models';
import { NewsletterService } from 'apps/commudle-admin/src/app/services/newsletter.service';
import { INewsletter } from 'apps/shared-models/newsletter.model';
import { SeoService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent implements OnInit {
  newsletter: INewsletter;
  community: ICommunity;
  constructor(
    private activatedRoute: ActivatedRoute,
    private newsletterService: NewsletterService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    const pageSlug = this.activatedRoute.snapshot.params['newsletter_slug'];
    this.activatedRoute.parent.parent.data.subscribe((data) => {
      this.community = data.community;
      this.getNewsletter(pageSlug, data.community.id);
    });
  }

  getNewsletter(slug, parentId) {
    this.newsletterService.getPShow(slug, parentId, 'Kommunity').subscribe((data) => {
      this.newsletter = data;
      this.setMeta();
    });
  }

  setMeta() {
    this.seoService.setTags(
      this.newsletter.title,
      this.newsletter.brief_description,
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
