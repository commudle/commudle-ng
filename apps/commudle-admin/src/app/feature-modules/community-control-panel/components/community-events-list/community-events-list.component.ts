import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { IColumnType, Settings } from 'angular2-smart-table';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { IEvent } from 'apps/shared-models/event.model';
import { CommunityEventsListActionsComponent } from './community-events-list-actions/community-events-list-actions.component';
import { CommunityEventsListDateComponent } from './community-events-list-date/community-events-list-date.component';
import { CommunityEventsListPublicPageComponent } from './community-events-list-public-page/community-events-list-public-page.component';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-community-events-list',
  templateUrl: './community-events-list.component.html',
  styleUrls: ['./community-events-list.component.scss'],
})
export class CommunityEventsListComponent implements OnInit {
  url: SafeResourceUrl;
  // url = 'https://documentation.commudle.com/';
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
        type: IColumnType.Custom,
        renderComponent: CommunityEventsListActionsComponent,
        isSortable: false,
      },
      public_page: {
        title: 'Public Page',
        filter: false,
        type: IColumnType.Custom,
        renderComponent: CommunityEventsListPublicPageComponent,
        isSortable: false,
      },
    },

    rowClassFunction: (row) => {
      return 'clickable';
    },
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
    public sanitizer: DomSanitizer,
  ) {}

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

  onLoad() {
    console.log('loaded successfully');
  }

  onError() {
    console.log('Error');
  }

  urlSafe() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://documentation.commudle.com/');
  }
}
