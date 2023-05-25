import { Component, OnInit } from '@angular/core';
import { HomeService } from 'apps/commudle-admin/src/app/services/home.service';
import { IEvent } from 'apps/shared-models/event.model';
import * as moment from 'moment';

@Component({
  selector: 'commudle-public-home-list-events-upcoming',
  templateUrl: './public-home-list-events-upcoming.component.html',
  styleUrls: ['./public-home-list-events-upcoming.component.scss'],
})
export class PublicHomeListEventsUpcomingComponent implements OnInit {
  events: IEvent[];
  upcomingEvents: IEvent[] = [];
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getUpcomingEvents();
  }

  // getUpcomingEvents() {
  //   this.homeService.pUpcomingEvents().subscribe((data) => {
  //     this.events = data.events;
  //     console.log(this.events);
  //     // this.changeDetectorRef.markForCheck();
  //   });
  // }

  getUpcomingEvents() {
    this.homeService.pUpcomingEvents().subscribe((data) => {
      this.events = data.events;
      this.events.forEach((event) => {
        if (moment(event.end_time) > moment()) {
          this.upcomingEvents.push(event);
        }
        console.log(this.events);
        // this.changeDetectorRef.markForCheck();
      });
    });
  }
}
