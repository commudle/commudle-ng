import { Component, OnInit } from '@angular/core';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';

@Component({
  selector: 'commudle-public-home-list-events-upcoming',
  templateUrl: './public-home-list-events-upcoming.component.html',
  styleUrls: ['./public-home-list-events-upcoming.component.scss'],
})
export class PublicHomeListEventsUpcomingComponent implements OnInit {
  community: ICommunity;
  upcomingEvents: IEvent[] = [];
  faCalendarDays = faCalendarDays;
  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.getUpcomingEvents();
  }

  getUpcomingEvents() {
    this.eventsService.getEventsList('future').subscribe((data) => {
      this.upcomingEvents = this.upcomingEvents.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
    });
  }
}
