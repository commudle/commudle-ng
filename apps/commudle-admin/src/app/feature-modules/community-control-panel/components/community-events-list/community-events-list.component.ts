import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Settings } from 'angular2-smart-table';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { IEvent } from 'apps/shared-models/event.model';
import { CommunityEventsListActionsComponent } from './community-events-list-actions/community-events-list-actions.component';
import { CommunityEventsListDateComponent } from './community-events-list-date/community-events-list-date.component';
import { CommunityEventsListPublicPageComponent } from './community-events-list-public-page/community-events-list-public-page.component';
import { Cell } from 'angular2-smart-table'; // Ensure this is imported

@Component({
  selector: 'app-community-events-list',
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
        isFilterable: false,
        type: 'custom',
        renderComponent: CommunityEventsListDateComponent,
        componentInitFunction: (instance: CommunityEventsListDateComponent, cell: Cell) => {
          const rowData: IEvent = cell.getRow().getData();
          instance.rowData = rowData;
        },
      },
      status: {
        title: 'Status',
        isFilterable: false,
      },
      actions: {
        title: 'Actions',
        isFilterable: false,
        type: 'custom',
        renderComponent: CommunityEventsListActionsComponent,
        isSortable: false,
        componentInitFunction: (instance: CommunityEventsListActionsComponent, cell: Cell) => {
          const rowData: IEvent = cell.getRow().getData();
          instance.rowData = rowData;
        },
      },
      public_page: {
        title: 'Public Page',
        isFilterable: false,
        type: 'custom',
        renderComponent: CommunityEventsListPublicPageComponent,
        isSortable: false,
        componentInitFunction: (instance: CommunityEventsListPublicPageComponent, cell: Cell) => {
          const rowData: IEvent = cell.getRow().getData();
          instance.rowData = rowData;
        },
      },
    },
    rowClassFunction: () => 'clickable',
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
}
