import { Component, OnInit, Input } from '@angular/core';
import { IEvent } from 'projects/shared-models/event.model';
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';
import { ICommunity } from 'projects/shared-models/community.model';
import { CommunitiesService } from '../../../services/communities.service';
import { UserEventRegistrationsService } from '../../../services/user-event-registrations.service';
import { IUser } from 'projects/shared-models/user.model';
import { DataFormEntityResponseGroupsService } from '../../../services/data-form-entity-response-groups.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  moment = moment;
  momentTimezone = momentTimezone;
  @Input() event: IEvent;
  community: ICommunity;
  users: IUser[] = [];
  totalCount = 0;

  constructor(
    private communitiesService: CommunitiesService,
    private dataFormEntityResponseGroupsService: DataFormEntityResponseGroupsService,
    private userEventRegistrationsService: UserEventRegistrationsService
  ) { }

  ngOnInit() {
    this.getCommunity();

    if (this.event.custom_registration) {
      this.getInterestedMembers();
    } else {
      this.getUserEventRegistrations();
    }
  }

  getCommunity() {
    this.communitiesService.pGetCommunityDetails(this.event.kommunity_id).subscribe(
      data => {
        this.community = data;
      }
    );
  }

  getInterestedMembers() {
    this.dataFormEntityResponseGroupsService.pEventInterestedUsers(this.event.id).subscribe(
      data => {
        this.users = data.users;
        this.totalCount = data.total_count;

      }
    );
  }

  getUserEventRegistrations() {
    this.userEventRegistrationsService.pEventInterestedUsers(this.event.id).subscribe(
      data => {
        this.users = data.users;
        this.totalCount = data.total;

      }
    );
  }

}
