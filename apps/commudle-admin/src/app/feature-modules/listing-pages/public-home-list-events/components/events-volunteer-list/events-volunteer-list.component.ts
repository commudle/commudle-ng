import { Component, Input, OnInit } from '@angular/core';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { IEvent } from 'apps/shared-models/event.model';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { IUser } from 'apps/shared-models/user.model';

@Component({
  selector: 'commudle-events-volunteer-list',
  templateUrl: './events-volunteer-list.component.html',
  styleUrls: ['./events-volunteer-list.component.scss'],
})
export class EventsVolunteerListComponent implements OnInit {
  @Input() event: IEvent;
  volunteers: IUser[] = [];
  pageInfo: IPageInfo;
  total: number;
  isLoadingVolunteers = false;
  showSpinner = false;
  showSkeletonLoading = true;
  limit = 4;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.getVolunteersList();
  }

  getVolunteersList() {
    this.showSpinner = true;
    if (this.isLoadingVolunteers) {
      return;
    }
    this.isLoadingVolunteers = true;
    this.eventsService.pGetEventVolunteers(this.event.id).subscribe((data) => {
      this.volunteers = this.volunteers.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.pageInfo = data.page_info;
      this.isLoadingVolunteers = false;
      this.showSpinner = false;
      this.showSkeletonLoading = false;
    });
  }
}
