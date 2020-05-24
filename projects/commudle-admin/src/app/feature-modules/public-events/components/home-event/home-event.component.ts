import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';
import { EventsService } from 'projects/commudle-admin/src/app/services/events.service';
import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';
@Component({
  selector: 'app-home-event',
  templateUrl: './home-event.component.html',
  styleUrls: ['./home-event.component.scss']
})
export class HomeEventComponent implements OnInit {
  moment = moment;
  momentTimezone = momentTimezone;

  community: ICommunity;
  event: IEvent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private communitiesService: CommunitiesService

  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      params => {
        this.getCommunity(params.community_id);
        this.getEvent(params.event_id);
        console.log(params);
      }
    );
  }

  getCommunity(communityId) {
    this.communitiesService.getCommunityDetails(communityId).subscribe(
      community => this.community = community
    );
  }

  getEvent(eventId) {
    this.eventsService.pGetEvent(eventId).subscribe(
      event => this.event = event
    );
  }

}
