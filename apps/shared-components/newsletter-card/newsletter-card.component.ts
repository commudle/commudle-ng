import { Component, Input, OnInit } from '@angular/core';
import { INewsletter } from 'apps/shared-models/newsletter.model';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-newsletter-card',
  templateUrl: './newsletter-card.component.html',
  styleUrls: ['./newsletter-card.component.scss'],
})
export class NewsletterCardComponent implements OnInit {
  @Input() newsletter: INewsletter;
  staticAssets = staticAssets;
  icons = {
    faArrowRight,
  };

  constructor() {}

  ngOnInit(): void {}
}
