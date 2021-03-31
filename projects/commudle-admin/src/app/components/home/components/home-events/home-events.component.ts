import {Component, OnInit} from '@angular/core';
import {HomeService} from 'projects/commudle-admin/src/app/services/home.service';
import {IEvent} from 'projects/shared-models/event.model';

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

  constructor(
    private homeService: HomeService
  ) {
  }

  ngOnInit(): void {
    this.getUpcomingEvents();
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
      setTimeout(() => this.isLoading = false, 500);
    });
  }

  updateEventsIdx(value: number) {
    this.isLoading = true;
    this.eventsStartIdx = (this.eventsStartIdx + value) % this.maxEventsCount;
    setTimeout(() => this.isLoading = false, 500);
  }

}
