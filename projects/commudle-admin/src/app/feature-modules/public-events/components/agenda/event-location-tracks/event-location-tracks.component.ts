import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IEvent} from 'projects/shared-models/event.model';
import {ICommunity} from 'projects/shared-models/community.model';
import {IEventLocation} from 'projects/shared-models/event-location.model';
import * as moment from 'moment';
import {TrackSlotsService} from 'projects/commudle-admin/src/app/services/track_slots.service';

@Component({
  selector: 'app-event-location-tracks',
  templateUrl: './event-location-tracks.component.html',
  styleUrls: ['./event-location-tracks.component.scss']
})
export class EventLocationTracksComponent implements OnInit {
  moment = moment;

  @Input() event: IEvent;
  @Input() community: ICommunity;
  @Input() eventLocation: IEventLocation;
  @Output() updateSessionPreference = new EventEmitter();

  constructor(
    private trackSlotsService: TrackSlotsService
  ) {
  }

  ngOnInit() {
  }

  toggleVote(trackSlotId, trackSlotIndex, trackIndex) {
    this.trackSlotsService.pToggleVote(trackSlotId).subscribe(
      data => {
        this.updateSessionPreference.emit({
          preference: data,
          track_slot_index: trackSlotIndex,
          track_index: trackIndex
        })
      }
    );
  }
}
