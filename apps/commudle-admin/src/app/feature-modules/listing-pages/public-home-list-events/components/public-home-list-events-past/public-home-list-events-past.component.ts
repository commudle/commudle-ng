import { Component, OnInit } from '@angular/core';
import { HomeService } from 'apps/commudle-admin/src/app/services/home.service';
import { IEvent } from 'apps/shared-models/event.model';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'apps/shared-models/community.model';

@Component({
  selector: 'commudle-public-home-list-events-past',
  templateUrl: './public-home-list-events-past.component.html',
  styleUrls: ['./public-home-list-events-past.component.scss'],
})
export class PublicHomeListEventsPastComponent implements OnInit {
  pastEvents: IEvent[];
  community: ICommunity;
  faCalendarCheck = faCalendarCheck;

  constructor(private homeService: HomeService, private communitiesService: CommunitiesService) {}

  ngOnInit(): void {
    this.getPastEvents();
  }

  getCommunity() {
    // this.communitiesService.getCommunityDetails(this.pastEvents.kommunity_id).subscribe((data) => {
    //   this.community = data;
    // });
  }

  getPastEvents() {
    this.homeService.pUpcomingEvents().subscribe((data) => {
      this.pastEvents = data.events;
      // console.log(this.pastEvents);
      // this.changeDetectorRef.markForCheck();
    });
  }
}
