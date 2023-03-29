import { RouterModule } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule } from '@commudle/theme';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import * as moment from 'moment';
import { IEvent } from 'apps/shared-models/event.model';
import { ICommunity } from 'apps/shared-models/community.model';

@Component({
  selector: 'commudle-event-card',
  templateUrl: './event-card.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, NbCardModule, SharedComponentsModule, NbIconModule],
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {
  @Input() event: IEvent;
  @Input() community: ICommunity;

  moment = moment;
  constructor() {}

  ngOnInit(): void {
    console.log(this.event);
  }
}
