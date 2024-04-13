import { Component, OnInit } from '@angular/core';
import { SeoService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-exa-drive-page',
  templateUrl: './exa-drive-page.component.html',
  styleUrls: ['./exa-drive-page.component.scss'],
})
export class ExaDrivePageComponent implements OnInit {
  images: { link: string; name: string }[] = [];
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.images = [
      { link: '/assets/crypto/Avalanche.png', name: 'Bitcoin (BTC)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'Ethereum (ETH)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'Tether (USDT)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'USD Coin (USDC)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'BNB (BNB)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'Binance Coin USD (BUSD)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'XRP (XRP)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'Cardano (ADA)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'Solana (SOL)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'Dogecoin (DOGE)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'Polkadot (DOT)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'Dai (DAI)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'Polygon (MATIC)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'Shiba Inu (SHIB)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'TRON (TRX)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'Avalanche (AVAX)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'UNUS SED LEO (LEO)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'Litecoin (LTC)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'Stellar (XLM)' },
      { link: '/assets/crypto/Bitcoin.png', name: 'Bitcoin Cash (BCH)' },
    ];
    this.setTags();
  }

  setTags() {
    this.seoService.setTags(
      'Exa Drive by Exa Protocol',
      'This is a page where all the assets are powered by Exa Drive which is a decentralized application built for Darwin',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
