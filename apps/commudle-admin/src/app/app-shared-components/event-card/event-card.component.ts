import { RouterModule } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule } from '@commudle/theme';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import * as moment from 'moment';
import { IEvent } from 'apps/shared-models/event.model';
import { ICommunity } from 'apps/shared-models/community.model';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';

@Component({
  selector: 'commudle-event-card',
  templateUrl: './event-card.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, NbCardModule, SharedComponentsModule, NbIconModule],
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {
  @Input() event: IEvent;
  @Input() horizontalScroll = false;
  community: ICommunity;

  moment = moment;
  constructor(private communitiesService: CommunitiesService) {}

  ngOnInit(): void {
    this.getCommunity();
  }

  getCommunity() {
    const eventCommunityId = this.event.kommunity ? this.event.kommunity.id : this.event.kommunity_id;
    this.communitiesService.pGetCommunityDetails(eventCommunityId).subscribe((data) => {
      this.community = data;
    });
  }
}
