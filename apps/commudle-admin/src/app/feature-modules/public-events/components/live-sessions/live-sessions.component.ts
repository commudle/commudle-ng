import { Component, Input, OnInit } from '@angular/core';
import { ICommunity, IEvent, ITrackSlot } from '@commudle/shared-models';
import { TrackSlotsService } from '@commudle/shared-services';
import * as moment from 'moment';

@Component({
  selector: 'commudle-live-sessions',
  templateUrl: './live-sessions.component.html',
  styleUrls: ['./live-sessions.component.scss'],
})
export class LiveSessionsComponent implements OnInit {
  moment = moment;

  @Input() community: ICommunity;
  @Input() event: IEvent;

  liveSessions: ITrackSlot[] = [];

  constructor(private trackSlotsService: TrackSlotsService) {}

  ngOnInit() {
    if (this.event.custom_agenda) {
      this.getLiveSessions();
    }
  }

  getLiveSessions() {
    this.trackSlotsService
      .pGetLiveEventSessions(this.event.id)
      .subscribe((data) => (this.liveSessions = data.track_slots));
  }
}
