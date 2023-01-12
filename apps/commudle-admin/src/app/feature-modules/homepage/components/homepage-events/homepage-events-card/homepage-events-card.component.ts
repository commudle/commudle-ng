import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';

@Component({
  selector: 'app-homepage-events-card',
  templateUrl: './homepage-events-card.component.html',
  styleUrls: ['./homepage-events-card.component.scss'],
})
export class HomepageEventsCardComponent implements OnInit {
  @Input() event: IEvent;

  moment = moment;
  community: ICommunity;
  registrations = 0;

  constructor(private communitiesService: CommunitiesService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getCommunity();
  }

  getCommunity(): void {
    this.communitiesService.pGetCommunityDetails(this.event.kommunity_id).subscribe((value) => {
      this.community = value;
      this.changeDetectorRef.markForCheck();
    });
  }
}
