import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { DataFormEntityResponseGroupsService } from 'apps/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { UserEventRegistrationsService } from 'apps/commudle-admin/src/app/services/user-event-registrations.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';

@Component({
  selector: 'app-home-events-card',
  templateUrl: './home-events-card.component.html',
  styleUrls: ['./home-events-card.component.scss']
})
export class HomeEventsCardComponent implements OnInit {

  @Input() event: IEvent;

  moment = moment;
  community: ICommunity;
  registrations = 0;

  constructor(
    private communitiesService: CommunitiesService,
    private dataFormEntityResponseGroupsService: DataFormEntityResponseGroupsService,
    private userEventRegistrationsService: UserEventRegistrationsService
  ) {
  }

  ngOnInit(): void {
    this.getCommunity();

    // if (this.event.custom_registration) {
    //   this.getInterestedMembers();
    // } else {
    //   this.getUserEventRegistrations();
    // }
  }

  getCommunity(): void {
    this.communitiesService.pGetCommunityDetails(this.event.kommunity_id).subscribe(value => this.community = value);
  }

  // getInterestedMembers(): void {
  //   this.dataFormEntityResponseGroupsService.pEventInterestedUsers(this.event.id).subscribe(value => this.registrations = value.total_count);
  // }

  // getUserEventRegistrations(): void {
  //   this.userEventRegistrationsService.pEventInterestedUsers(this.event.id).subscribe(value => this.registrations = value.total);
  // }
}
