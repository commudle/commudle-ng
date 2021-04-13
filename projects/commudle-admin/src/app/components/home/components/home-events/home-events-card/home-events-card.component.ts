import {Component, Input, OnInit} from '@angular/core';
import {IEvent} from 'projects/shared-models/event.model';
import {ICommunity} from 'projects/shared-models/community.model';
import {CommunitiesService} from 'projects/commudle-admin/src/app/services/communities.service';
import moment from 'moment';
import {UserEventRegistrationsService} from 'projects/commudle-admin/src/app/services/user-event-registrations.service';
import {DataFormEntityResponseGroupsService} from 'projects/commudle-admin/src/app/services/data-form-entity-response-groups.service';

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

  getInterestedMembers(): void {
    this.dataFormEntityResponseGroupsService.pEventInterestedUsers(this.event.id).subscribe(value => this.registrations = value.total_count);
  }

  getUserEventRegistrations(): void {
    this.userEventRegistrationsService.pEventInterestedUsers(this.event.id).subscribe(value => this.registrations = value.total);
  }
}
