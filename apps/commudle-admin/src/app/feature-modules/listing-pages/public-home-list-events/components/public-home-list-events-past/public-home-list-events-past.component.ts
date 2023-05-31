import { Component, OnInit } from '@angular/core';
import { IEvent } from 'apps/shared-models/event.model';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { IPageInfo } from 'apps/shared-models/page-info.model';

@Component({
  selector: 'commudle-public-home-list-events-past',
  templateUrl: './public-home-list-events-past.component.html',
  styleUrls: ['./public-home-list-events-past.component.scss'],
})
export class PublicHomeListEventsPastComponent implements OnInit {
  pastEvents: IEvent[] = [];
  community;
  faCalendarCheck = faCalendarCheck;

  page_info: IPageInfo;
  total;
  isLoadingUpcoming = false;
  showSpinner = false;

  constructor(private eventsService: EventsService, private communitiesService: CommunitiesService) {}

  ngOnInit(): void {
    this.getPastEvents();
  }

  getPastEvents() {
    this.isLoadingUpcoming = true;
    this.showSpinner = true;
    this.eventsService.getEventsList('past').subscribe((data) => {
      this.pastEvents = this.pastEvents.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.total = data.total;
      this.page_info = data.page_info;
      this.isLoadingUpcoming = false;
      this.showSpinner = false;
    });
  }

  getCommunity() {
    // this.communitiesService.pGetCommunityDetails(this.pastEvents.kommunity_id).subscribe((data) => {
    //   this.community = data;
    // });
  }
}
// this.upcomingEvents.forEach((event) => {
// });
