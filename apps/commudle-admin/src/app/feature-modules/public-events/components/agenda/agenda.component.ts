import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { EventLocationsService } from 'apps/commudle-admin/src/app/services/event-locations.service';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEventDatesLocation, IEventLocation } from 'apps/shared-models/event-location.model';
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
  @Input() showShareButton = true;

  eventLocations: IEventLocation[] = [];
  eventDatesLocation: IEventDatesLocation[];
  isLoading = true;
  selectedLocation;
  upcomingEvents: Array<ITrackSlot> = [];

  constructor(
    private eventLocationsService: EventLocationsService,
    private seoService: SeoService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getDatesEventLocations();
  }

  setSchema() {
    if (
      this.event.start_time &&
      this.eventDatesLocation.length > 0 &&
      this.eventDatesLocation[0].event_locations[0].location
    ) {
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
          name: this.eventDatesLocation[0].event_locations[0].location.address,
          address: {
            '@type': 'PostalAddress',
            streetAddress: this.eventDatesLocation[0].event_locations[0].location.address,
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

  updateSessionPreference(data, locationIndex) {
    this.eventLocations[locationIndex].event_location_tracks[data.track_index].track_slots[
      data.track_slot_index
    ].user_vote = data.preference;
  }

  getUpcomingEvents(data) {
    let allEvents: Array<ITrackSlot> = [];
    this.upcomingEvents = [];

    data.forEach((elt) => {
      elt.track_slots.forEach((slot) => {
        allEvents.push(slot);
      });
    });

    allEvents = _.sortBy(allEvents, (slot) => moment(slot.start_time));

    allEvents.forEach((slot) => {
      if (moment(slot.start_time).isAfter(moment()) && moment().isAfter(moment(this.event.start_time))) {
        this.upcomingEvents.push(slot);
      }
    });
  }

  getDatesEventLocations() {
    this.eventLocationsService.getEventDates(this.event.slug).subscribe((data: any) => {
      if (data) {
        this.eventDatesLocation = data;
        if (data.event_locations) {
          this.selectLocation(data[0].event_locations[0]);
        }
        this.setSchema();
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  selectLocation(eventLocation) {
    this.selectedLocation = eventLocation;
  }

  onTabChange(event: any) {
    const tabIndex = this.eventDatesLocation.findIndex((d) => {
      const formattedDate = moment(d.date).format('Do MMMM');
      return formattedDate === event.tabTitle;
    });
    if (tabIndex !== -1) {
      if (this.eventDatesLocation[tabIndex] && this.eventDatesLocation[tabIndex].event_locations.length > 0) {
        this.selectLocation(this.eventDatesLocation[tabIndex].event_locations[0]);
      }
    }
  }
}
