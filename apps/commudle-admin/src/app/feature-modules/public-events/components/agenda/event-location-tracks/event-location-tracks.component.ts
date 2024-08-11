import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IEvent } from 'apps/shared-models/event.model';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEventLocation } from 'apps/shared-models/event-location.model';
import * as moment from 'moment';
import { TrackSlotsService } from 'apps/commudle-admin/src/app/services/track_slots.service';
import * as _ from 'lodash';
import { SeoService } from 'apps/shared-services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { faChevronRight, faLink } from '@fortawesome/free-solid-svg-icons';
import { EventLocationsService } from 'apps/commudle-admin/src/app/services/event-locations.service';

@Component({
  selector: 'app-event-location-tracks',
  templateUrl: './event-location-tracks.component.html',
  styleUrls: ['./event-location-tracks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventLocationTracksComponent implements OnInit, OnChanges {
  moment = moment;
  @Input() event: IEvent;
  @Input() community: ICommunity;
  @Input() eventLocation: IEventLocation;
  @Input() eventLocationDate: Date;
  @Output() updateSessionPreference = new EventEmitter();
  @Output() TrackSlotsDetails = new EventEmitter();
  sortedTrackSlots = {};
  trackSlotVisibility = {};
  viewMoreSection = true;
  footerText = 'View More';
  visibility: boolean;
  faLink = faLink;
  eventLocationTracks: any;
  isLoading = true;
  faChevronRight = faChevronRight;

  constructor(
    private trackSlotsService: TrackSlotsService,
    private seoService: SeoService,
    private activatedRoute: ActivatedRoute,
    private eventLocationsService: EventLocationsService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    if (this.seoService.isBot) {
      this.visibility = true;
    } else {
      this.visibility = this.eventLocation.event_location_tracks?.length <= 2;
      this.setTrackVisibility();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.eventLocation || changes.eventLocationDate) {
      this.getLocationTracks();
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

  setTrackVisibility() {
    if (this.eventLocationTracks) {
      this.visibility = this.eventLocationTracks.length <= 2;
      for (const event_location_track of this.eventLocationTracks) {
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
  }

  getLocationTracks() {
    this.isLoading = true;
    this.eventLocationsService
      .getLocationTracks(this.eventLocation.location.id, this.eventLocationDate)
      .subscribe((data: any) => {
        this.eventLocationTracks = data;
        if (data) {
          this.TrackSlotsDetails.emit(this.eventLocationTracks);
        }
        this.setTrackVisibility();
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  splitTags(tag: string): string[] {
    return tag ? tag.split(/[\s\n]+/) : [];
  }
}
