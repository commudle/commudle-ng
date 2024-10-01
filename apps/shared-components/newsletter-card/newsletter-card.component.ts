import { Component, Input, OnInit } from '@angular/core';
import { INewsletter } from 'apps/shared-models/newsletter.model';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ICommunity } from '@commudle/shared-models';
import { EDbModels } from '@commudle/shared-models';

@Component({
  selector: 'commudle-newsletter-card',
  templateUrl: './newsletter-card.component.html',
  styleUrls: ['./newsletter-card.component.scss'],
})
export class NewsletterCardComponent implements OnInit {
  @Input() newsletter: INewsletter;
  @Input() parentType = EDbModels.NEWSLETTER;
  @Input() community: ICommunity;

  staticAssets = staticAssets;
  EDbModels = EDbModels;
  icons = {
    faArrowRight,
  };

  constructor() {}

  ngOnInit(): void {}
}
