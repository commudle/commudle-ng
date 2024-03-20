/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, Input, OnInit } from '@angular/core';
import { IHackathonTeam } from 'apps/shared-models/hackathon-team.model';
import { IHackathon, EHackathonLocationType } from 'apps/shared-models/hackathon.model';
import { faGlobe, faAward } from '@fortawesome/free-solid-svg-icons';
import { countries_details } from '@commudle/shared-services';
@Component({
  selector: 'commudle-public-hackathon-details-mini-card',
  templateUrl: './public-hackathon-details-mini-card.component.html',
  styleUrls: ['./public-hackathon-details-mini-card.component.scss'],
})
export class PublicHackathonDetailsMiniCardComponent implements OnInit {
  @Input() hackathon: IHackathon;
  @Input() userTeamDetails: IHackathonTeam;
  @Input() hrgId: number;
  icons = {
    faGlobe,
    faAward,
  };

  EHackathonLocationType = EHackathonLocationType;
  totalPrizesByCurrency: { currency: any; amount: number }[];
  countryDetails = countries_details;

  // constructor() {}

  ngOnInit() {
    if (this.hackathon.total_prize_amount) {
      this.totalPrizesByCurrency = Object.keys(this.hackathon.total_prize_amount).map((currency) => ({
        currency: this.countryDetails.find((detail) => detail.currency === currency),
        amount: this.hackathon.total_prize_amount[currency],
      }));
    }
  }
}
