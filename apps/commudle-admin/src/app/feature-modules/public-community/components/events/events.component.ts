import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity, IEvent } from '@commudle/shared-models';
import { EventsService, SeoService } from '@commudle/shared-services';
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';

@Component({
  selector: 'commudle-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  moment = moment;
  momentTimezone = momentTimezone;
  community: ICommunity;
  events: IEvent[] = [];
  eventLoader = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.eventLoader = true;
    this.activatedRoute.parent.data.subscribe((data) => {
      this.community = data.community;
      this.getEvents();
      this.seoService.setTitle(`Events | ${this.community.name}`);
    });
  }

  getEvents() {
    this.eventsService.pGetCommunityEvents(this.community.id).subscribe((data) => {
      this.events = data.events;
      this.eventLoader = false;
    });
  }
}
