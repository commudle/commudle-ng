import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'commudle-featured-experts-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-experts-card.component.html',
  styleUrls: ['./featured-experts-card.component.scss'],
})
export class FeaturedExpertsCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
