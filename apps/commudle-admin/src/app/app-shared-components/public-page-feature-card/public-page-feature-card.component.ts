import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'commudle-public-page-feature-card',
  templateUrl: './public-page-feature-card.component.html',
  styleUrls: ['./public-page-feature-card.component.scss'],
})
export class PublicPageFeatureCardComponent implements OnInit {
  @Input() feature: any;
  constructor() {}

  ngOnInit(): void {}
}
