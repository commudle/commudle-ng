import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from 'apps/shared-models/event.model';
import * as moment from 'moment';

@Component({
  selector: 'commudle-public-home-list-events-past-card',
  templateUrl: './public-home-list-events-past-card.component.html',
  styleUrls: ['./public-home-list-events-past-card.component.scss'],
})
export class PublicHomeListEventsPastCardComponent implements OnInit {
  @Input() pastEvent: IEvent;
  moment = moment;
  constructor() {}

  ngOnInit(): void {}
}
