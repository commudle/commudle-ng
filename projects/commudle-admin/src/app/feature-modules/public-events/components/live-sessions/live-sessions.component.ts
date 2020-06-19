import { Component, OnInit, Input } from '@angular/core';
import { IEvent } from 'projects/shared-models/event.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { ITrackSlot } from 'projects/shared-models/track-slot.model';
import { TrackSlotsService } from 'projects/commudle-admin/src/app/services/track_slots.service';
import * as moment from 'moment';

@Component({
  selector: 'app-live-sessions',
  templateUrl: './live-sessions.component.html',
  styleUrls: ['./live-sessions.component.scss']
})
export class LiveSessionsComponent implements OnInit {
  moment = moment;

  @Input() community: ICommunity;
  @Input() event: IEvent;

  liveSessions: ITrackSlot[] = [];

  constructor(
    private trackSlotsService: TrackSlotsService
  ) { }

  ngOnInit() {
    if (this.event.custom_agenda) {
      this.getLiveSessions();
    }
  }

  getLiveSessions() {
    this.trackSlotsService.pGetLiveEventSessions(this.event.id).subscribe(
      data => this.liveSessions = data.track_slots
    );
  }

}
