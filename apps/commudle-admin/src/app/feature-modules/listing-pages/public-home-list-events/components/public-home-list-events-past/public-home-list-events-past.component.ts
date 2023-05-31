import { Component, OnInit } from '@angular/core';
import { HomeService } from 'apps/commudle-admin/src/app/services/home.service';
import { IEvent } from 'apps/shared-models/event.model';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';

@Component({
  selector: 'commudle-public-home-list-events-past',
  templateUrl: './public-home-list-events-past.component.html',
  styleUrls: ['./public-home-list-events-past.component.scss'],
})
export class PublicHomeListEventsPastComponent implements OnInit {
  pastEvents: IEvent[] = [];
  community;
  faCalendarCheck = faCalendarCheck;

  constructor(private eventsService: EventsService, private communitiesService: CommunitiesService) {}

  ngOnInit(): void {
    this.getPastEvents();
  }

  getPastEvents() {
    this.eventsService.getEventsList('past').subscribe((data) => {
      this.pastEvents = this.pastEvents.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
    });
  }

  // getCommunity() {
  //   this.communitiesService.pGetCommunityDetails(this.pastEvents.kommunity_id).subscribe((data) => {
  //     this.community = data;
  //   });
  // }
}
// this.upcomingEvents.forEach((event) => {
// });
