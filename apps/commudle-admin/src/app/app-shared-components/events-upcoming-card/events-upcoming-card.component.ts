import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbIconModule } from '@commudle/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IEvent } from 'apps/shared-models/event.model';
import * as moment from 'moment';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { ICommunity } from 'apps/shared-models/community.model';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
@Component({
  selector: 'commudle-events-upcoming-card',
  standalone: true,
  templateUrl: './events-upcoming-card.component.html',
  styleUrls: ['./events-upcoming-card.component.scss'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    SharedComponentsModule,
    SharedDirectivesModule,
  ],
})
export class EventsUpcomingCardComponent implements OnInit {
  @Input() event: IEvent;
  community: ICommunity;
  moment = moment;

  constructor(private communitiesService: CommunitiesService) {}

  ngOnInit(): void {
    this.getCommunity();
  }

  getCommunity() {
    this.communitiesService.pGetCommunityDetails(this.event.kommunity_id).subscribe((data) => {
      this.community = data;
    });
  }
}
