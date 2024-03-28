/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonUserResponses } from 'apps/shared-models/hackathon-user-responses.model';
import { HackathonWinnerService } from 'apps/commudle-admin/src/app/services/hackathon-winner.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { countries_details } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';
import { IHackathonPrize, IHackathonTeam, IHackathonWinner } from '@commudle/shared-models';

@Component({
  selector: 'commudle-hackathon-prize-card',
  templateUrl: './hackathon-prize-card.component.html',
  styleUrls: ['./hackathon-prize-card.component.scss'],
})
export class HackathonPrizeCardComponent implements OnInit {
  @Input() hackathonPrize: IHackathonPrize;
  @Output() editPrizeEvent: EventEmitter<IHackathonPrize> = new EventEmitter();
  @Output() destroyPrizeEvent: EventEmitter<number> = new EventEmitter();
  countryDetails = countries_details;
  prizeCurrencySymbol: any;
  hackathonUserResponses: IHackathonUserResponses[];
  icons = {
    faXmark,
  };
  constructor(
    private nbDialogService: NbDialogService,
    private hackathonService: HackathonService,
    private hackathonWinnerService: HackathonWinnerService,
  ) {}

  ngOnInit() {
    this.prizeCurrencySymbol = this.countryDetails.find(
      (detail) => detail.currency === this.hackathonPrize.currency_type,
    );
  }

  editPrize(prize) {
    this.editPrizeEvent.emit(prize);
  }

  deletePrize(hackathonPrizeId) {
    this.destroyPrizeEvent.emit(hackathonPrizeId);
  }

  openPrizeDistributionDialogBox(dialog) {
    this.hackathonService.indexUserResponses(this.hackathonPrize.hackathon_id).subscribe((data) => {
      if (data) {
        this.hackathonUserResponses = data;
      }
    });
    this.nbDialogService.open(dialog, {});
  }

  addWinner(team: IHackathonTeam, index: number) {
    this.hackathonWinnerService
      .addHackathonWinner(this.hackathonPrize.id, team.id)
      .subscribe((data: IHackathonWinner) => {
        this.hackathonUserResponses[index].team.hackathon_winners.push(data);
      });
  }

  removeWinner(winnerId, userResponseIndex, winnerIndex) {
    this.hackathonWinnerService.removeHackathonWinner(winnerId).subscribe((data) => {
      if (data) {
        const team = this.hackathonUserResponses[userResponseIndex].team;
        const winners = team.hackathon_winners;
        winners.splice(winnerIndex, 1);
      }
    });
  }
}
