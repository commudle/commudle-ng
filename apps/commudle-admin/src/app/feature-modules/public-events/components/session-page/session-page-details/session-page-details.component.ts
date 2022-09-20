import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { ICommunity } from '@commudle/shared-models';
import { IEvent } from '@commudle/shared-models';
import { ITrackSlot } from '@commudle/shared-models';
import { IUser } from '@commudle/shared-models';

@Component({
  selector: 'commudle-session-page-details',
  templateUrl: './session-page-details.component.html',
  styleUrls: ['./session-page-details.component.scss']
})
export class SessionPageDetailsComponent implements OnInit {

  @Input() event: IEvent;
  @Input() community: ICommunity;
  @Input() trackSlot: ITrackSlot;
  @Input() speaker: IUser;
  @Input() startTime: Date;
  @Input() endTime: Date;

  @Output() openViewers: EventEmitter<any> = new EventEmitter<any>();

  moment = moment;

  constructor() {
  }

  ngOnInit(): void {
  }

}
