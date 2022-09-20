import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICommunity, IEvent, IEventLocation } from '@commudle/shared-models';
import { TrackSlotsService } from '@commudle/shared-services';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'commudle-event-location-tracks',
  templateUrl: './event-location-tracks.component.html',
  styleUrls: ['./event-location-tracks.component.scss'],
})
export class EventLocationTracksComponent implements OnInit {
  moment = moment;

  @Input() event: IEvent;
  @Input() community: ICommunity;
  @Input() eventLocation: IEventLocation;
  @Output() updateSessionPreference = new EventEmitter();

  constructor(private trackSlotsService: TrackSlotsService) {}

  ngOnInit() {}

  toggleVote(trackSlotId, trackSlotIndex, trackIndex) {
    this.trackSlotsService.pToggleVote(trackSlotId).subscribe((data) => {
      this.updateSessionPreference.emit({
        preference: data,
        track_slot_index: trackSlotIndex,
        track_index: trackIndex,
      });
    });
  }

  sortTrackSlots(track_slots) {
    return _.sortBy(track_slots, (slot) => {
      // @ts-ignore
      return new moment(slot.start_time);
    });
  }
}
