import { Component, Input, OnInit } from '@angular/core';
import { IHackathon } from 'apps/shared-models/hackathon.model';
import moment from 'moment';
import { countries_details } from '@commudle/shared-services';

@Component({
  selector: 'commudle-hackathon-medium-card',
  templateUrl: './hackathon-medium-card.component.html',
  styleUrls: ['./hackathon-medium-card.component.scss'],
})
export class HackathonMediumCardComponent implements OnInit {
  @Input() hackathon: IHackathon;
  @Input() showRegisterButton = false;
  moment = moment;
  prizeCurrency;
  totalPrizesByCurrency: { currency: any; amount: number }[];
  countryDetails = countries_details;

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
