import { Component, OnInit } from '@angular/core';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { ICommunity } from 'apps/shared-models/community.model';

@Component({
  selector: 'commudle-public-home-list-events-tech-sessions',
  templateUrl: './public-home-list-events-tech-sessions.component.html',
  styleUrls: ['./public-home-list-events-tech-sessions.component.scss'],
})
export class PublicHomeListEventsTechSessionsComponent implements OnInit {
  techSessions = [];
  faHeadset = faHeadset;
  community;
  constructor(private eventsService: EventsService, private communitiesService: CommunitiesService) {}

  ngOnInit(): void {
    this.getTechSessions();
  }

  getCommunity() {
    this.techSessions.forEach((event) => {
      this.communitiesService.getCommunityDetails(event.kommunity.id).subscribe((data) => {
        this.community = data;
      });
    });
  }

  getTechSessions() {
    this.eventsService.getTechSessions().subscribe((data) => {
      this.techSessions = this.techSessions.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      // console.log(this.techSessions, 'tech-sesssionsss');
      // this.getCommunity();
    });
  }
}
