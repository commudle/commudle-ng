import { EEventStatuses } from '@commudle/shared-models';
import { Component, OnInit, Input } from '@angular/core';
import { IEvent } from '@commudle/shared-models';
import * as moment from 'moment';

@Component({
  selector: 'commudle-community-events-list-date',
  templateUrl: './community-events-list-date.component.html',
  styleUrls: ['./community-events-list-date.component.scss']
})
export class CommunityEventsListDateComponent implements OnInit {
  @Input() value: string | number;
  @Input() rowData: IEvent;

  EEventStatuses = EEventStatuses;

  moment = moment;

  constructor() { }

  ngOnInit() {
  }

}
