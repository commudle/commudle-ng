import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-cards',
  templateUrl: './skeleton-cards.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./skeleton-cards.component.scss'],
})
export class SkeletonCardsComponent implements OnInit {
  @Input() cards = 1;
  @Input() displayFollowButton = false;
  cardsArray;

  constructor() {}

  ngOnInit(): void {
    this.cardsArray = new Array(this.cards);
  }
}
