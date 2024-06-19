import { Component, Input, OnInit } from '@angular/core';
import { countries_details } from '@commudle/shared-services';
import { IHackathon } from 'apps/shared-models/hackathon.model';
import moment from 'moment';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
@Component({
  selector: 'commudle-hackathon-large-card',
  templateUrl: './hackathon-large-card.component.html',
  styleUrls: ['./hackathon-large-card.component.scss'],
})
export class HackathonLargeCardComponent implements OnInit {
  @Input() hackathon: IHackathon;
  moment = moment;
  prizeCurrency;
  totalPrizesByCurrency: { currency: any; amount: number }[];
  countryDetails = countries_details;
  staticAssets = staticAssets;

  constructor() {}

  ngOnInit() {
    if (this.hackathon.total_prize_amount) {
      this.totalPrizesByCurrency = Object.keys(this.hackathon.total_prize_amount).map((currency) => ({
        currency: this.countryDetails.find((detail) => detail.currency === currency),
        amount: this.hackathon.total_prize_amount[currency],
      }));
    }
  }
}
