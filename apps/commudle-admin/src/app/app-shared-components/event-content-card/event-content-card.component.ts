import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NbCardModule } from '@commudle/theme';

@Component({
  selector: 'commudle-event-content-card',
  standalone: true,
  imports: [CommonModule, RouterModule, NbCardModule],
  templateUrl: './event-content-card.component.html',
  styleUrls: ['./event-content-card.component.scss'],
})
export class EventContentCardComponent implements OnInit {
  @Input() horizontalScroll = false;
  constructor() {}

  ngOnInit(): void {}
}
