import { Component, OnInit } from '@angular/core';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import * as moment from 'moment';

@Component({
  selector: 'commudle-public-home-list-events-upcoming',
  templateUrl: './public-home-list-events-upcoming.component.html',
  styleUrls: ['./public-home-list-events-upcoming.component.scss'],
})
export class PublicHomeListEventsUpcomingComponent implements OnInit {
  events: IEvent[];
  community: ICommunity;
  upcomingEvents: IEvent[] = [];
  faCalendarDays = faCalendarDays;
  constructor(private eventsService: EventsService, private communitiesService: CommunitiesService) {}

  ngOnInit(): void {
    this.getUpcomingEvents();
  }

  // this.upcomingEvents.forEach((event) => {
  //   if (moment(event.end_time) > moment()) {
  //     this.upcomingEvents.push(event);
  //   }
  // });

  getUpcomingEvents() {
    this.eventsService.getEventsList('future').subscribe((data) => {
      this.upcomingEvents = this.upcomingEvents.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      // this.getCommunity();
    });
  }
}
