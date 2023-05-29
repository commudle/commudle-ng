import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule } from '@commudle/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'commudle-public-home-list-events-tech-sessions-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule, NbButtonModule, NbCardModule],
  templateUrl: './public-home-list-events-tech-sessions-card.component.html',
  styleUrls: ['./public-home-list-events-tech-sessions-card.component.scss'],
})
export class PublicHomeListEventsTechSessionsCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
