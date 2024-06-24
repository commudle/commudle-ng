import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { faCalendarCheck, faCalendarDays, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'apps/commudle-admin/src/environments/environment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  moment = moment;
  momentTimezone = momentTimezone;
  community: ICommunity;
  events: IEvent[] = [];
  isLoading = true;

  eventForSchema = [];

  upcomingEvents = [];
  pastEvents = [];
  faMapPin = faMapPin;
  faCalendarDays = faCalendarDays;
  faCalendarCheck = faCalendarCheck;

  count = 10;
  page = 1;
  total = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe((data) => {
      this.community = data.community;
      this.getEvents();
      this.seoService.setTitle(`Events | ${this.community.name}`);
    });
  }

  getEvents() {
    this.eventsService.pGetCommunityEvents(this.community.id, this.page, this.count).subscribe((data) => {
      this.events = data.values;

      this.events.forEach((event) => {
        if (moment(event.end_time) > moment() || event.end_time === null) {
          this.upcomingEvents.push(event);
        } else {
          this.pastEvents.push(event);
        }
      });
      this.setSchema();
      this.isLoading = false;
      this.total = data.total;
      this.page = data.page;
      this.count = data.count;
    });
  }

  setSchema() {
    if (this.upcomingEvents.length > 0) {
      for (const event of this.upcomingEvents) {
        let location: object, eventStatus: string;
        if (event.event_locations && Object.keys(event.event_locations).length > 0) {
          location = {
            '@type': 'Place',
            name: event.event_locations[0].name,
            address: event.event_locations[0].address,
          };
          eventStatus = 'OfflineEventAttendanceMode';
        } else {
          location = {
            '@type': 'VirtualLocation',
            url: environment.app_url + '/communities/' + event.kommunity_slug + '/events/' + event.slug,
          };
          eventStatus = 'OnlineEventAttendanceMode';
        }
        this.eventForSchema.push({
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: event.name,
          image: event.header_image_path ? event.header_image_path : this.community.logo_path,
          startDate: event.start_time,
          endDate: event.end_time,
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/' + eventStatus,
          location: location,
          organizer: {
            '@type': 'Organization',
            name: this.community.name,
            url: environment.app_url + '/communities/' + this.community.slug,
          },
          offers: {
            '@type': 'Offer',
            name: event.name,
            url: environment.app_url + '/communities/' + this.community.slug + '/events/' + event.slug,
          },
        });
      }

      this.seoService.setSchema(this.eventForSchema);
    }
  }
}
