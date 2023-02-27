import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-cards',
  templateUrl: './skeleton-cards.component.html',
  styleUrls: ['./skeleton-cards.component.scss'],
})
export class SkeletonCardsComponent implements OnInit {
  @Input() cards: number;
  cardsArray;

  constructor() {}

  ngOnInit(): void {
    this.cardsArray = new Array(this.cards);
  }
}
