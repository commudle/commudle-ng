import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEvent } from 'apps/shared-models/event.model';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEventLocation } from 'apps/shared-models/event-location.model';
import * as moment from 'moment';
import { TrackSlotsService } from 'apps/commudle-admin/src/app/services/track_slots.service';
import * as _ from 'lodash';
import { SeoService } from 'apps/shared-services/seo.service';
import { ActivatedRoute } from '@angular/router';

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
  visibility: boolean;

  constructor(
    private trackSlotsService: TrackSlotsService,
    private seoService: SeoService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    if (this.seoService.isBot) {
      this.visibility = true;
    } else {
      this.visibility = this.eventLocation.event_location_tracks.length <= 2;
    }
    for (const event_location_track of this.eventLocation.event_location_tracks) {
      this.trackSlotVisibility[event_location_track.id] = this.visibility;
      this.sortedTrackSlots[event_location_track.id] = this.sortTrackSlots(event_location_track.track_slots);
    }
    if (this.activatedRoute.snapshot.queryParamMap.get('track_id')) {
      this.trackSlotVisibility[this.activatedRoute.snapshot.queryParamMap.get('track_id')] = true;
      if (this.trackSlotVisibility[this.activatedRoute.snapshot.queryParamMap.get('track_id')]) {
        setTimeout(() => {
          document.getElementById(this.activatedRoute.snapshot.queryParamMap.get('track_id')).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }, 100);
      }
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
}
