import { Component, Input, OnInit } from '@angular/core';
import {} from '@fortawesome/fontawesome-svg-core';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';

@Component({
  selector: 'commudle-public-page-feature-card',
  templateUrl: './public-page-feature-card.component.html',
  styleUrls: ['./public-page-feature-card.component.scss'],
})
export class PublicPageFeatureCardComponent implements OnInit {
  @Input() feature: any;
  staticAssets = staticAssets;
  constructor() {}

  ngOnInit(): void {}
}
