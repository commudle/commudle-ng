import { Component, Input, OnInit } from '@angular/core';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { IEventStatus } from 'apps/shared-models/event_status.model';
import { ISpeakerResource } from 'apps/shared-models/speaker_resource.model';

@Component({
  selector: 'app-user-past-event-card',
  templateUrl: './user-past-event-card.component.html',
  styleUrls: ['./user-past-event-card.component.scss'],
})
export class UserPastEventCardComponent implements OnInit {
  @Input() pastEvent: IEvent;
  speaker_resource: ISpeakerResource;
  event_status: IEventStatus;
  community: ICommunity;

  constructor(private communitiesService: CommunitiesService) {}

  ngOnInit(): void {
    this.getCommunity();
  }

  getCommunity() {
    this.communitiesService.pGetCommunityDetails(this.pastEvent.kommunity_id).subscribe((data) => {
      this.community = data;
    });
  }
}
