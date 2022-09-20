import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ICommunity } from '@commudle/shared-models';
import { IEvent } from '@commudle/shared-models';

@Component({
  selector: 'commudle-homepage-events-card',
  templateUrl: './homepage-events-card.component.html',
  styleUrls: ['./homepage-events-card.component.scss'],
})
export class HomepageEventsCardComponent implements OnInit {
  @Input() event: IEvent;

  moment = moment;
  community: ICommunity;
  registrations = 0;

  constructor(private communitiesService: CommunitiesService) {}

  ngOnInit(): void {
    this.getCommunity();
  }

  getCommunity(): void {
    this.communitiesService
      .pGetCommunityDetails(this.event.kommunity_id)
      .subscribe((value) => (this.community = value));
  }
}
