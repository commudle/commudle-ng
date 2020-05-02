import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { EventsService } from '../../../services/events.service';
import { IEvent } from 'projects/shared-models/event.model';

@Component({
  selector: 'app-community-events-list',
  templateUrl: './community-events-list.component.html',
  styleUrls: ['./community-events-list.component.scss']
})
export class CommunityEventsListComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  communityId;
  events: IEvent[];

  tableSettings = {
    actions: false,
    pager: {
      perPage: 5
    },
    columns: {
      name: {
        title: 'Name'
      },
      status: {
        title: 'Status',
        filter: false
      }
    },

    rowClassFunction: (row) => {
      return 'clickable';
    }
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.communityId = params.name;
      this.getCommunityEvents();
    });
  }


  getCommunityEvents() {
    this.eventsService.communityEventsForEmail(this.communityId).subscribe(data => {
      this.events = data.events;
    });
  }

  redirectToEvent($event) {
    this.router.navigate(['/admin/communities', this.communityId, 'event-dashboard', $event.data.slug]);
  }


}
