import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { countries_details } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonPrize } from 'apps/shared-models/hackathon-prize.model';
import { IHackathonUserResponses } from 'apps/shared-models/hackathon-user-responses.model';

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
  constructor(private nbDialogService: NbDialogService, private hackathonService: HackathonService) {}

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
}
