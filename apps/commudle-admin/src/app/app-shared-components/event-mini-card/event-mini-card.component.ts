import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IEvent } from 'apps/shared-models/event.model';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { NbCardModule } from '@commudle/theme';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as moment from 'moment';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';

@Component({
  selector: 'commudle-event-mini-card',
  standalone: true,
  templateUrl: './event-mini-card.component.html',
  styleUrls: ['./event-mini-card.component.scss'],
  imports: [CommonModule, NbCardModule, RouterModule, FontAwesomeModule, SharedComponentsModule],
})
export class EventMiniCardComponent implements OnInit {
  @Input() attendedEvent: IEvent;
  faCalendarCheck = faCalendarCheck;
  moment = moment;
  constructor() {}

  ngOnInit(): void {}
}
