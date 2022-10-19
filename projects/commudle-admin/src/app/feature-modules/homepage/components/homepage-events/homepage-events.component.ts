import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeService } from 'projects/commudle-admin/src/app/services/home.service';
import { IEvent } from 'projects/shared-models/event.model';
import { IsBrowserService } from 'projects/shared-services/is-browser.service';

@Component({
  selector: 'app-homepage-events',
  templateUrl: './homepage-events.component.html',
  styleUrls: ['./homepage-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageEventsComponent implements OnInit {
  events: IEvent[];
  maxEventsCount = 12;
  eventsStartIdx = 0;
  isLoading = true;

  constructor(
    private homeService: HomeService,
    private isBrowserService: IsBrowserService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (this.isBrowserService.isBrowser()) {
      this.getUpcomingEvents();
    }
  }

  getUpcomingEvents() {
    this.homeService.pUpcomingEvents().subscribe((data) => {
      this.events = data.events;
      this.getRandomPastEvents(Math.max(0, this.maxEventsCount - this.events.length));
      this.changeDetectorRef.markForCheck();
    });
  }

  getRandomPastEvents(count) {
    this.homeService.pPastRandomEvents(count).subscribe((data) => {
      this.events.push(...data.events);
      this.isLoading = false;
      this.changeDetectorRef.markForCheck();
    });
  }

  updateEventsIdx(value: number) {
    this.isLoading = true;
    this.eventsStartIdx = (this.eventsStartIdx + value) % this.maxEventsCount;
    this.isLoading = false;
    this.changeDetectorRef.markForCheck();
  }
}
