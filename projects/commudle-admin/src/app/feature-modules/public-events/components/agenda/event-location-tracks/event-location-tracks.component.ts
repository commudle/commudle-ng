import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEvent } from 'projects/shared-models/event.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEventLocation } from 'projects/shared-models/event-location.model';
import * as moment from 'moment';
import { ITrackSlot } from 'projects/shared-models/track-slot.model';
import { TrackSlotsService } from 'projects/commudle-admin/src/app/services/track_slots.service';

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

  hours = [];
  minutes = [];

  minHour;
  maxHour;

  constructor(
    private trackSlotsService: TrackSlotsService
  ) { }

  ngOnInit() {
    this.setMinMaxHour();
  }


  setMinMaxHour() {
    for (let track of this.eventLocation.event_location_tracks) {
      for (let slot of track.track_slots) {
        const mH = moment(slot.start_time).hours();
        const maxH = moment(slot.end_time).hours();

        if (this.minHour) {
          this.minHour = (this.minHour > mH ? mH : this.minHour);
        } else {
          this.minHour = mH;
        }

        if (this.maxHour) {
          this.maxHour = (this.maxHour > maxH ? this.maxHour : maxH);
        } else {
          this.maxHour = maxH;
        }
      }
    }

    this.minutes = [...Array(60).keys()];

    for (let i = this.minHour; i <= this.maxHour; i++) {
      this.hours.push(i);
    }
  }

  displayTime(hour, minute) {
    return moment(`${hour}:${minute}`, 'H:m').format('hh:mm A');
  }


  slotSessionHeight(slot: ITrackSlot): number {
    const diff = moment(slot.end_time).diff(slot.start_time, 'minutes');
    return (6 * diff) + 30;
  }

  slotSessionOffsetFromTop(slot: ITrackSlot): number {
    const startTime = moment(slot.start_time);
    const diffH = startTime.hours() - this.minHour;
    return (diffH * 6 * 60 ) + (startTime.minute() * 6);
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
