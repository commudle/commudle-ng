import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsletterService } from 'apps/commudle-admin/src/app/services/newsletter.service';
import { INewsletter } from 'apps/shared-models/newsletter.model';

@Component({
  selector: 'commudle-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent implements OnInit {
  newsletter: INewsletter;
  constructor(private activatedRoute: ActivatedRoute, private newsletterService: NewsletterService) {}

  ngOnInit() {
    const pageSlug = this.activatedRoute.snapshot.params['newsletter_slug'];
    this.activatedRoute.parent.parent.data.subscribe((data) => {
      this.getNewsletter(pageSlug, data.community.id);
    });
  }

  getNewsletter(slug, parentId) {
    this.newsletterService.getPShow(slug, parentId, 'Kommunity').subscribe((data) => {
      this.newsletter = data;
    });
  }
}
