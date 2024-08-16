import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IEvent } from 'apps/shared-models/event.model';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { NbButtonModule, NbCardModule, NbIconModule } from '@commudle/theme';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as moment from 'moment';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { ICommunity } from 'apps/shared-models/community.model';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { environment } from '@commudle/shared-environments';
import { EDbModels } from '@commudle/shared-models';

@Component({
  selector: 'commudle-event-mini-card',
  standalone: true,
  templateUrl: './event-mini-card.component.html',
  styleUrls: ['./event-mini-card.component.scss'],
  imports: [
    CommonModule,
    NbCardModule,
    RouterModule,
    FontAwesomeModule,
    SharedComponentsModule,
    NbButtonModule,
    NbIconModule,
  ],
})
export class EventMiniCardComponent implements OnInit {
  @Input() attendedEvent: IEvent;
  @Input() cardType: EDbModels;
  @Input() iconSize: 'small' | 'medium' = 'small';
  community: ICommunity;
  faCalendarCheck = faCalendarCheck;
  environment = environment;
  moment = moment;
  EDbModels = EDbModels;

  constructor(private communitiesService: CommunitiesService) {}

  ngOnInit(): void {
    this.getCommunity();
  }

  getCommunity() {
    this.communitiesService.pGetCommunityDetails(this.attendedEvent.kommunity_id).subscribe((data) => {
      this.community = data;
    });
  }
}
