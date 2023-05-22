import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'commudle-public-home-list-events-featured-communities-card',
  templateUrl: './public-home-list-events-featured-communities-card.component.html',
  styleUrls: ['./public-home-list-events-featured-communities-card.component.scss'],
})
export class PublicHomeListEventsFeaturedCommunitiesCardComponent implements OnInit {
  @Input() community;
  constructor() {}

  ngOnInit(): void {}
}
