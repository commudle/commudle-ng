import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'commudle-skeleton-vertical-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton-vertical-cards.component.html',
  styleUrls: ['./skeleton-vertical-cards.component.scss'],
})
export class SkeletonVerticalCardsComponent implements OnInit {
  @Input() cards = 1;
  @Input() displayFollowButton = true;
  cardsArray;

  constructor() {}

  ngOnInit(): void {
    this.cardsArray = new Array(this.cards);
  }
}
