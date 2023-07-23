import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { IEvent } from 'apps/shared-models/event.model';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { IUser } from 'apps/shared-models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-events-volunteer-list',
  templateUrl: './events-volunteer-list.component.html',
  styleUrls: ['./events-volunteer-list.component.scss'],
})
export class EventsVolunteerListComponent implements OnInit, OnDestroy {
  @Input() event: IEvent;
  @Input() heading = 'List of Volunteers';
  @Input() subheading = 'Team who helped manage this event';
  volunteers: IUser[] = [];
  pageInfo: IPageInfo;
  total: number;
  isLoadingVolunteers = false;
  showSpinner = false;
  showSkeletonLoading = true;
  limit = 4;

  subscriptions: Subscription[] = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.getVolunteersList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getVolunteersList() {
    this.showSpinner = true;
    if (this.isLoadingVolunteers) {
      return;
    }
    this.isLoadingVolunteers = true;
    this.subscriptions.push(
      this.eventsService.pGetEventVolunteers(this.event.slug).subscribe((data) => {
        this.volunteers = this.volunteers.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.pageInfo = data.page_info;
        this.isLoadingVolunteers = false;
        this.showSpinner = false;
        this.showSkeletonLoading = false;
      }),
    );
  }
}
