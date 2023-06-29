import { Component, OnInit } from '@angular/core';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';

@Component({
  selector: 'commudle-public-home-list-speakers-upcoming',
  templateUrl: './public-home-list-speakers-upcoming.component.html',
  styleUrls: ['./public-home-list-speakers-upcoming.component.scss'],
})
export class PublicHomeListSpeakersUpcomingComponent implements OnInit {
  community: ICommunity;
  upcomingEvents: IEvent[] = [];
  showSpinner = true;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.getUpcomingEvents();
  }

  getUpcomingEvents() {
    this.eventsService.getEventsList('future').subscribe((data) => {
      this.upcomingEvents = this.upcomingEvents.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.showSpinner = false;
    });
  }
}
