import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@commudle/theme';
import { ExaDriveService } from 'apps/commudle-admin/src/app/feature-modules/exa-drive/service/exa-drive.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'commudle-crypto-currency-card',
  templateUrl: './crypto-currency-card.component.html',
  styleUrls: ['./crypto-currency-card.component.scss'],
})
export class CryptoCurrencyCardComponent implements OnInit {
  @Input() cryptoCurrency;
  faXmark = faXmark;
  constructor(private exaDriveService: ExaDriveService, private nbDialogService: NbDialogService) {}

  ngOnInit() {
    this.exaDriveService.getCoinData(this.cryptoCurrency.id).then((data) => {
      this.cryptoCurrency.details = data;
    });
  }

  openPopup(dialog) {
    this.nbDialogService.open(dialog);
  }
}
