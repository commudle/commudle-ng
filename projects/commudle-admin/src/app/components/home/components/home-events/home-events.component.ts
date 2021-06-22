import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HomeService } from 'projects/commudle-admin/src/app/services/home.service';
import { IEvent } from 'projects/shared-models/event.model';

@Component({
  selector: 'app-home-events',
  templateUrl: './home-events.component.html',
  styleUrls: ['./home-events.component.scss']
})
export class HomeEventsComponent implements OnInit {

  events: IEvent[];
  maxEventsCount = 12;
  eventsStartIdx = 0;
  isLoading = true;

  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(
    private homeService: HomeService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.getUpcomingEvents();
    }
  }

  getUpcomingEvents() {
    this.homeService.pUpcomingEvents().subscribe(data => {
      this.events = data.events;
      this.getRandomPastEvents(Math.max(0, this.maxEventsCount - this.events.length));
    });
  }

  getRandomPastEvents(count) {
    this.homeService.pPastRandomEvents(count).subscribe(data => {
      this.events.push(...data.events);
      this.isLoading = false;
    });
  }

  updateEventsIdx(value: number) {
    this.isLoading = true;
    this.eventsStartIdx = (this.eventsStartIdx + value) % this.maxEventsCount;
    this.isLoading = false;
  }

}
