import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IEvent} from 'apps/shared-models/event.model';
import {ICommunity} from 'apps/shared-models/community.model';
import {IEventLocation} from 'apps/shared-models/event-location.model';
import * as moment from 'moment';
import {TrackSlotsService} from 'apps/commudle-admin/src/app/services/track_slots.service';
import * as _ from "lodash";

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

  sortTrackSlots(track_slots) {
    return _.sortBy(track_slots, slot => {
      // @ts-ignore
      return new moment(slot.start_time);
    });
  }
}
