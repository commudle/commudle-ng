import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEvent } from 'apps/shared-models/event.model';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEventLocation } from 'apps/shared-models/event-location.model';
import * as moment from 'moment';
import { TrackSlotsService } from 'apps/commudle-admin/src/app/services/track_slots.service';
import { SeoService } from 'apps/shared-services/seo.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-event-location-tracks',
  templateUrl: './event-location-tracks.component.html',
  styleUrls: ['./event-location-tracks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventLocationTracksComponent implements OnInit {
  moment = moment;
  @Input() event: IEvent;
  @Input() community: ICommunity;
  @Input() eventLocation: IEventLocation;
  @Output() updateSessionPreference = new EventEmitter();
  sortedTrackSlots = {};
  trackSlotVisibility = {};
  viewMoreSection = true;
  footerText = 'View More';
  totalSlotsCount: number;
  totalSlots: number;
  isMobileView: boolean;
  visibility: boolean;
  isBot: boolean;

  constructor(private trackSlotsService: TrackSlotsService, private seoService: SeoService) {}

  // ngOnInit() {
  //   this.isMobileView = window.innerWidth <= 640;
  //   const visibility = this.eventLocation.event_location_tracks.length <= 2;
  //   for (const event_location_track of this.eventLocation.event_location_tracks) {
  //     this.trackSlotVisibility[event_location_track.id] = visibility;
  //     this.sortedTrackSlots[event_location_track.id] = this.sortTrackSlots(event_location_track.track_slots);
  //     this.totalSlotsCount = this.sortTrackSlots(event_location_track.track_slots).length;
  //   }
  //   this.isMobileView ? (this.totalSlots = 4) : (this.totalSlots = 8);
  //   if (this.totalSlotsCount > this.totalSlots) {
  //     this.footerText = `View More (${this.totalSlotsCount - this.totalSlots})`;
  //   }
  // }

  ngOnInit() {
    this.isMobileView = window.innerWidth <= 640;
    if (this.seoService.isBot) {
      this.visibility = true;
      this.isBot = true;
    } else {
      this.visibility = this.eventLocation.event_location_tracks.length <= 2;
      this.isBot = false;
    }
    for (const event_location_track of this.eventLocation.event_location_tracks) {
      this.trackSlotVisibility[event_location_track.id] = this.visibility;
      this.sortedTrackSlots[event_location_track.id] = this.sortTrackSlots(event_location_track.track_slots);
      this.totalSlotsCount = this.sortTrackSlots(event_location_track.track_slots).length;
    }
    this.isMobileView ? (this.totalSlots = 4) : (this.totalSlots = 8);
    if (this.totalSlotsCount > this.totalSlots) {
      this.footerText = `View More (${this.totalSlotsCount - this.totalSlots})`;
    }
  }

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

  changeTrackSlotVisibility(visibility, id) {
    this.trackSlotVisibility[id] = visibility;
  }

  viewMore() {
    this.viewMoreSection = !this.viewMoreSection;
    if (!this.viewMoreSection) {
      this.footerText = `View Less`;
    } else {
      this.footerText = `View More (${this.totalSlotsCount - this.totalSlots})`;
    }
  }
}
