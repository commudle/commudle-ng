import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent } from '@commudle/shared-models';
import { EventsService } from '@commudle/shared-services';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { IColumnType, Settings } from 'angular2-smart-table';
import { CommunityEventsListActionsComponent } from './community-events-list-actions/community-events-list-actions.component';
import { CommunityEventsListDateComponent } from './community-events-list-date/community-events-list-date.component';

@Component({
  selector: 'commudle-community-events-list',
  templateUrl: './community-events-list.component.html',
  styleUrls: ['./community-events-list.component.scss'],
})
export class CommunityEventsListComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  communityId;
  events: IEvent[];

  tableSettings: Settings = {
    actions: false,
    pager: {
      perPage: 10,
    },
    columns: {
      name: {
        title: 'Name',
      },
      date: {
        title: 'Date',
        filter: false,
        type: IColumnType.Custom,
        renderComponent: CommunityEventsListDateComponent,
      },
      status: {
        title: 'Status',
        filter: false,
      },
      actions: {
        title: 'Actions',
        filter: false,
        isSortable: false,
        type: IColumnType.Custom,
        renderComponent: CommunityEventsListActionsComponent,
      },
    },

    rowClassFunction: (row) => {
      return 'clickable';
    },
  };

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private eventsService: EventsService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.communityId = params.community_id;
      this.getCommunityEvents();
    });
  }

  getCommunityEvents() {
    this.eventsService.communityEventsForEmail(this.communityId).subscribe((data) => {
      this.events = data.events;
    });
  }

  redirectToEvent($event) {
    this.router.navigate(['/admin/communities', this.communityId, 'event-dashboard', $event.data.slug]);
  }
}
