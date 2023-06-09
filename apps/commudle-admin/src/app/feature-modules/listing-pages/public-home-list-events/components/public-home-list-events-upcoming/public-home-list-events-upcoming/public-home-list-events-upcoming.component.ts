import { Component, OnInit } from '@angular/core';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { SeoService } from 'apps/shared-services/seo.service';
@Component({
  selector: 'commudle-public-home-list-events-upcoming',
  templateUrl: './public-home-list-events-upcoming.component.html',
  styleUrls: ['./public-home-list-events-upcoming.component.scss'],
})
export class PublicHomeListEventsUpcomingComponent implements OnInit {
  community: ICommunity;
  upcomingEvents: IEvent[] = [];
  faCalendarDays = faCalendarDays;
  eventForSchema = [];
  page_info: IPageInfo;
  total: number;

  isLoadingUpcoming = false;
  showSpinner = false;

  constructor(private eventsService: EventsService, private seoService: SeoService) {}

  ngOnInit(): void {
    this.getUpcomingEvents();
  }

  getUpcomingEvents() {
    this.isLoadingUpcoming = true;
    this.showSpinner = true;
    this.eventsService.getEventsList('future', this.page_info?.end_cursor).subscribe((data) => {
      this.upcomingEvents = this.upcomingEvents.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.total = data.total;
      this.page_info = data.page_info;
      this.isLoadingUpcoming = false;
      this.showSpinner = false;
      this.setSchema();
    });
  }

  setSchema() {
    for (const event of this.upcomingEvents) {
      this.eventForSchema.push({
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: event.name,
        description: event.description.replace(/<[^>]*>/g, '').substring(0, 200),
        image: event.header_image_path ? event.header_image_path : this.community.logo_path,
        startDate: event.start_time,
        endDate: event.end_time,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        organizer: {
          '@type': 'Organization',
          name: event.kommunity.name,
          url: environment.app_url + '/communities/' + event.kommunity.slug,
        },
        offers: {
          '@type': 'Offer',
          name: event.name,
          url: environment.app_url + '/communities/' + event.kommunity.slug + '/events/' + event.slug,
        },
      });
    }

    this.seoService.setSchema(this.eventForSchema);
  }
}
