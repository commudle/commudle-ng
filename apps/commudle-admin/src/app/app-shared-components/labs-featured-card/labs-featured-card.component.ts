import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'commudle-labs-featured-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs-featured-card.component.html',
  styleUrls: ['./labs-featured-card.component.scss'],
})
export class LabsFeaturedCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
