import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { EventLocationsService } from 'apps/commudle-admin/src/app/services/event-locations.service';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEventLocation } from 'apps/shared-models/event-location.model';
import { IEvent } from 'apps/shared-models/event.model';
import { ITrackSlot } from 'apps/shared-models/track-slot.model';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaComponent implements OnInit {
  moment = moment;

  @Input() community: ICommunity;
  @Input() event: IEvent;

  eventLocations: IEventLocation[] = [];

  isLoading = true;

  constructor(
    private eventLocationsService: EventLocationsService,
    private seoService: SeoService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    if (this.event.custom_agenda) {
      this.getEventLocations();
    }
  }

  getEventLocations() {
    this.eventLocationsService.pGetEventLocations(this.event.id).subscribe((data) => {
      this.eventLocations = data.event_locations;
      this.isLoading = false;
      this.setSchema();
      this.changeDetectorRef.markForCheck();
    });
  }

  setSchema() {
    if (this.event.start_time) {
      this.seoService.setSchema({
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: this.event.name,
        description: this.event.description.replace(/<[^>]*>/g, '').substring(0, 200),
        image: this.event.header_image_path ? this.event.header_image_path : this.community.logo_path,
        startDate: this.event.start_time,
        endDate: this.event.end_time,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: this.eventLocations[0].location ? this.eventLocations[0].location.address : '',
          address: {
            '@type': 'PostalAddress',
            streetAddress: this.eventLocations[0].location ? this.eventLocations[0].location.address : '',
            addressCountry: 'IN',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: this.community.name,
          url: environment.app_url + '/communities/' + this.community.slug,
        },
        offers: {
          '@type': 'Offer',
          name: this.event.name,
          url: environment.app_url + '/communities/' + this.community.slug + '/events/' + this.event.slug,
        },
      });
    }
  }

  getLocationName(eventLocation: IEventLocation) {
    return eventLocation.embedded_video_stream
      ? 'Video Stream'
      : eventLocation.location
      ? eventLocation.location.name
      : '';
  }

  getTabIcon(eventLocation: IEventLocation) {
    return eventLocation.embedded_video_stream ? 'video' : 'pin';
  }

  updateSessionPreference(data, locationIndex) {
    this.eventLocations[locationIndex].event_location_tracks[data.track_index].track_slots[
      data.track_slot_index
    ].user_vote = data.preference;
  }

  getUpcomingEvents() {
    let allEvents: Array<ITrackSlot> = [];
    const upcomingEvents: Array<ITrackSlot> = [];

    this.eventLocations.forEach((el) =>
      el.event_location_tracks.forEach((elt) => elt.track_slots.forEach((slot) => allEvents.push(slot))),
    );

    allEvents = _.sortBy(allEvents, (slot) => moment(slot.start_time));

    allEvents.forEach((slot) => {
      if (moment(slot.start_time).isAfter(moment()) && moment().isAfter(moment(this.event.start_time))) {
        upcomingEvents.push(slot);
      }
    });

    return upcomingEvents;
  }
}
