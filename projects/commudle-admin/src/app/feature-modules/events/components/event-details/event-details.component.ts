import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';

@Component({
  selector: 'app-event-details',
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
