import { Component, OnInit } from '@angular/core';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { HomeService } from 'apps/commudle-admin/src/app/services/home.service';
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
  constructor(private homeService: HomeService, private communitiesService: CommunitiesService) {}

  ngOnInit(): void {
    this.getUpcomingEvents();
  }

  getCommunity() {
    // this.communitiesService.getCommunityDetails(this.upcomingEvents.kommunity_id).subscribe((data) => {
    //   this.community = data;
    // });
  }

  getUpcomingEvents() {
    this.homeService.pUpcomingEvents().subscribe((data) => {
      this.upcomingEvents = data.events;
      this.getCommunity();
      // this.changeDetectorRef.markForCheck();
    });
  }

  // getUpcomingEvents() {
  //   this.homeService.pUpcomingEvents().subscribe((data) => {
  //     this.events = data.events;
  //     console.log(data);
  //     this.events.forEach((event) => {
  //       if (moment(event.end_time) > moment()) {
  //         this.upcomingEvents.push(event);
  //       }
  //       console.log(this.events);
  //       // this.changeDetectorRef.markForCheck();
  //     });
  //   });
  // }
}
