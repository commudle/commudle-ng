import { Component, Input, OnInit } from '@angular/core';
import { IFeaturedCommunity } from 'apps/shared-models/featured-community.model';

@Component({
  selector: 'commudle-public-home-list-events-featured-communities-card',
  templateUrl: './public-home-list-events-featured-communities-card.component.html',
  styleUrls: ['./public-home-list-events-featured-communities-card.component.scss'],
})
export class PublicHomeListEventsFeaturedCommunitiesCardComponent implements OnInit {
  @Input() featuredCommunity: IFeaturedCommunity;
  constructor() {}

  ngOnInit(): void {}
}
