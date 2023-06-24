import { Component, OnInit } from '@angular/core';
import { IEvent } from 'apps/shared-models/event.model';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { IPageInfo } from 'apps/shared-models/page-info.model';

@Component({
  selector: 'commudle-public-home-list-events-past',
  templateUrl: './public-home-list-events-past.component.html',
  styleUrls: ['./public-home-list-events-past.component.scss'],
})
export class PublicHomeListEventsPastComponent implements OnInit {
  pastEvents: IEvent[] = [];
  faCalendarCheck = faCalendarCheck;

  page_info: IPageInfo;
  limit = 9;
  total: number;
  isLoadingUpcoming = false;
  showSpinner = false;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.getPastEvents();
  }

  getPastEvents() {
    this.isLoadingUpcoming = true;
    this.showSpinner = true;
    this.eventsService.getEventsList('past', this.limit, this.page_info?.end_cursor).subscribe((data) => {
      this.pastEvents = this.pastEvents.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.total = data.total;
      this.page_info = data.page_info;
      this.isLoadingUpcoming = false;
      this.showSpinner = false;
    });
  }
}
