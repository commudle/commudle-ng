import { Component, OnInit } from '@angular/core';
import { HomeService } from 'apps/commudle-admin/src/app/services/home.service';
import { IEvent } from 'apps/shared-models/event.model';

@Component({
  selector: 'commudle-public-home-list-events-past',
  templateUrl: './public-home-list-events-past.component.html',
  styleUrls: ['./public-home-list-events-past.component.scss'],
})
export class PublicHomeListEventsPastComponent implements OnInit {
  pastEvents: IEvent[];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getPastEvents();
  }

  getPastEvents() {
    this.homeService.pUpcomingEvents().subscribe((data) => {
      this.pastEvents = data.events;
      console.log(this.pastEvents);
      // this.changeDetectorRef.markForCheck();
    });
  }
}
