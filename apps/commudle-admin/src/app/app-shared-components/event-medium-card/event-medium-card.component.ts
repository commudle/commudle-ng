import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbIconModule } from '@commudle/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { IEvent } from 'apps/shared-models/event.model';
import * as moment from 'moment';
import { faUserGroup, faMapPin } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-event-medium-card',
  templateUrl: './event-medium-card.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbCardModule,
    SharedComponentsModule,
    NbButtonModule,
    FontAwesomeModule,
    NbIconModule,
  ],
  styleUrls: ['./event-medium-card.component.scss'],
})
export class EventMediumCardComponent implements OnInit {
  @Input() event: IEvent;
  @Input() width: string;
  moment = moment;

  faUserGroup = faUserGroup;
  faMapPin = faMapPin;

  constructor() {}

  ngOnInit(): void {
    console.log(this.event);
  }
}
