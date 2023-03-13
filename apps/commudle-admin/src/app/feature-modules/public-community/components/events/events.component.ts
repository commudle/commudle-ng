import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  moment = moment;
  momentTimezone = momentTimezone;
  community: ICommunity;
  events: IEvent[] = [];
  eventLoader = false;

  upcomingEvents = [];
  pastEvents = [];
  faMapPin = faMapPin;

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

      this.events.forEach((event) => {
        if (moment(event.end_time) > moment()) {
          this.upcomingEvents.push(event);
        } else {
          this.pastEvents.push(event);
        }
      });
      this.eventLoader = false;
    });
  }
}
