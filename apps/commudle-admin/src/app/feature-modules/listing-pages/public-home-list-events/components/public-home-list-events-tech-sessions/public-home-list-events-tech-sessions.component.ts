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
  showSpinner = false;
  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.getTechSessions();
  }

  getTechSessions() {
    this.showSpinner = true;
    this.eventsService.getTechSessions().subscribe((data) => {
      this.techSessions = this.techSessions.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.showSpinner = false;
    });
  }
}
