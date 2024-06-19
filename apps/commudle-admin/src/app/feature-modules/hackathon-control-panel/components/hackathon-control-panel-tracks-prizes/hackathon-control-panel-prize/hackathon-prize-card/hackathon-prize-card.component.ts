import { ToastrService } from '@commudle/shared-services';
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
    private toastrService: ToastrService,
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
        for (const hur of this.hackathonUserResponses) {
          for (const hw of hur.team.hackathon_winners) {
            if (hw.hackathon_prize.id === this.hackathonPrize.id) {
              hur.team.prize_selected = true;
              break;
            } else {
              hur.team.prize_selected = false;
            }
          }
        }
      }
    });
    this.nbDialogService.open(dialog, {});
  }

  addWinner(team: IHackathonTeam, index: number) {
    this.hackathonWinnerService
      .addHackathonWinner(this.hackathonPrize.id, team.id)
      .subscribe((data: IHackathonWinner) => {
        this.hackathonUserResponses[index].team.hackathon_winners.push(data);
        this.hackathonUserResponses[index].team.prize_selected = true;
        this.toastrService.successDialog('Winner Selected');
      });
  }

  removeWinner(winnerId, userResponseIndex, winnerIndex) {
    this.hackathonWinnerService.removeHackathonWinner(winnerId).subscribe((data) => {
      if (data) {
        const team = this.hackathonUserResponses[userResponseIndex].team;
        this.hackathonUserResponses[userResponseIndex].team.prize_selected = false;
        const winners = team.hackathon_winners;
        winners.splice(winnerIndex, 1);
        this.toastrService.successDialog('Winner Removed');
      }
    });
  }
}
