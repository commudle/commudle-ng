import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonPrize } from 'apps/shared-models/hackathon-prize.model';
import { IHackathon } from 'apps/shared-models/hackathon.model';
import { Subscription } from 'rxjs';
import { countries_details as countryDetails } from '@commudle/shared-services';
import { IHackathonTeam } from 'apps/shared-models/hackathon-team.model';
import { HackathonResponseGroupService } from 'apps/commudle-admin/src/app/services/hackathon-response-group.service';

@Component({
  selector: 'commudle-public-hackathon-prizes',
  templateUrl: './public-hackathon-prizes.component.html',
  styleUrls: ['./public-hackathon-prizes.component.scss'],
})
export class PublicHackathonPrizesComponent implements OnInit {
  subscriptions: Subscription[] = [];
  hackathon: IHackathon;
  hackathonPrizes: IHackathonPrize[];
  isLoading = true;
  userTeamDetails: IHackathonTeam[];
  hrgId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private hrgService: HackathonResponseGroupService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.hackathon = data.hackathon;
        this.getPrizes();
        this.getHackathonCurrentRegistrationDetails();
      }),
    );
    this.hrgService.showHackathonResponseGroup(this.hackathon.id).subscribe((data) => {
      this.hrgId = data.id;
    });
  }

  getPrizes() {
    this.subscriptions.push(
      this.hackathonService.pIndexPrizes(this.hackathon.id).subscribe((data) => {
        this.hackathonPrizes = data;
        this.hackathonPrizes.forEach((prize) => {
          const prizeCurrencySymbol = countryDetails.find((detail) => detail.currency === prize.currency_type);
          prize.currency_symbol = prizeCurrencySymbol.symbol;
        });
        this.isLoading = false;
      }),
    );
  }

  getHackathonCurrentRegistrationDetails() {
    this.subscriptions.push(
      this.hackathonService
        .getHackathonCurrentRegistrationDetails(this.hackathon.id)
        .subscribe((data: IHackathonTeam[]) => {
          if (data) this.userTeamDetails = data;
        }),
    );
  }
}
