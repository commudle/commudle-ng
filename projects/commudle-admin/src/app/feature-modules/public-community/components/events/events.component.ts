import { Component, OnInit } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'projects/commudle-admin/src/app/services/events.service';
import { IEvent } from 'projects/shared-models/event.model';
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  moment = moment;
  momentTimezone = momentTimezone;
  community: ICommunity;
  events: IEvent[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe(data => {
      this.community = data.community;
      console.log(this.community);
      this.getEvents();
    });
  }

  getEvents() {
    this.eventsService.pGetCommunityEvents(this.community.id).subscribe(
      data => {
        this.events = data.events;
      }
    );
  }

}
