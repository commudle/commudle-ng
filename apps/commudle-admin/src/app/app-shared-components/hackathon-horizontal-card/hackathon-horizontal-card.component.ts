import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbIconModule } from '@commudle/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as moment from 'moment';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { countries_details } from '@commudle/shared-services';
import { IHackathon, ICommunity } from '@commudle/shared-models';

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
  @Input() hackathon: IHackathon;
  community: ICommunity;
  moment = moment;
  faSackDollar = faSackDollar;
  countryDetails = countries_details;
  totalPrizes: { currency: any; amount: number }[];

  constructor() {}

  ngOnInit() {
    this.totalPrizes = Object.keys(this.hackathon.total_prize_amount).map((currency) => ({
      currency: this.countryDetails.find((detail) => detail.currency === currency),
      amount: this.hackathon.total_prize_amount[currency],
    }));
  }
}
