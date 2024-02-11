import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { countries_details } from '@commudle/shared-services';
import { IHackathonPrize } from 'apps/shared-models/hackathon-prize.model';

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
  constructor() {}

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
}
