import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbIconModule } from '@commudle/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { ICommunity } from 'apps/shared-models/community.model';
import * as moment from 'moment';

@Component({
  selector: 'commudle-tech-sessions-card',
  standalone: true,
  templateUrl: './tech-sessions-card.component.html',
  styleUrls: ['./tech-sessions-card.component.scss'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    NbButtonModule,
    NbCardModule,
    SharedComponentsModule,
    NbIconModule,
  ],
})
export class TechSessionsCardComponent implements OnInit {
  @Input() session;
  @Input() horizontalScroll = false;
  community: ICommunity;
  moment = moment;
  constructor(private communitiesService: CommunitiesService) {}

  ngOnInit(): void {
    console.log(this.session);
    this.getCommunity();
  }

  getCommunity() {
    this.communitiesService.pGetCommunityDetails(this.session.event.kommunity.id).subscribe((data) => {
      this.community = data;
    });
  }
}
