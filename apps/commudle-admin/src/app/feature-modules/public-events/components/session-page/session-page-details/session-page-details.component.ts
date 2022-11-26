import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { ITrackSlot } from 'apps/shared-models/track-slot.model';
import { IUser } from 'apps/shared-models/user.model';

@Component({
  selector: 'app-session-page-details',
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
