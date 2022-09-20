import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { ICommunity } from '@commudle/shared-models';
import { IEvent } from '@commudle/shared-models';

@Component({
  selector: 'commudle-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  @Input() event: IEvent;
  @Input() community: ICommunity;
  @Output() updateHeaderImage = new EventEmitter<any>();
  @Output() deleteHeaderImage = new EventEmitter<any>();

  moment = moment;

  constructor() {}

  ngOnInit(): void {}
}
