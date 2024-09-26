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
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { countries_details } from '@commudle/shared-services';

@Component({
  selector: 'commudle-hackathon-horizontal-card',
  standalone: true,
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
  templateUrl: './hackathon-horizontal-card.component.html',
  styleUrls: ['./hackathon-horizontal-card.component.scss'],
})
export class HackathonHorizontalCardComponent implements OnInit {
  @Input() hackathon: any;
  @Input() parentType = 'Event';
  prizeCurrencySymbol: any;
  community: ICommunity;
  moment = moment;
  faSackDollar = faSackDollar;
  countryDetails = countries_details;

  constructor(private communitiesService: CommunitiesService) {}

  ngOnInit(): void {
    const currencyCode = Object.keys(this.hackathon.total_prize_amount)[0];
    this.prizeCurrencySymbol = this.countryDetails.find((detail) => detail.currency === currencyCode);
  }

  getCommunity() {
    this.communitiesService.pGetCommunityDetails(this.hackathon.kommunity_slug).subscribe((data) => {
      this.community = data;
    });
  }
}
