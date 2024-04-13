import { Component, OnInit } from '@angular/core';
import { SeoService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-exa-drive-page',
  templateUrl: './exa-drive-page.component.html',
  styleUrls: ['./exa-drive-page.component.scss'],
})
export class ExaDrivePageComponent implements OnInit {
  images: { link: string; name: string }[] = [];
  exaProtocolImageLink: string;
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.images = [
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992122052.png', name: 'Bitcoin (BTC)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992324430.png', name: 'Ethereum (ETH)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992404273.png', name: 'Tether (USDT)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992438741.png', name: 'USD Coin (USDC)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992174408.png', name: 'BNB (BNB)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992193455.png', name: 'Binance Coin USD (BUSD)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992449011.png', name: 'XRP (XRP)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992217896.png', name: 'Cardano (ADA)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992377630.png', name: 'Solana (SOL)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992267077.png', name: 'Dogecoin (DOGE)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992342231.png', name: 'Polkadot (DOT)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992258298.png', name: 'Dai (DAI)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992351032.png', name: 'Polygon (MATIC)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992365443.png', name: 'Shiba Inu (SHIB)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992415103.png', name: 'TRON (TRX)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992095429.png', name: 'Avalanche (AVAX)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992430957.png', name: 'UNUS SED LEO (LEO)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992333376.png', name: 'Litecoin (LTC)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992393995.png', name: 'Stellar (XLM)' },
      { link: 'https://dfs-theog-testnet.exaprotocol.com/1712992248279.png', name: 'Cronos (CRO)' },
    ];
    this.exaProtocolImageLink = 'https://dfs-theog-testnet.exaprotocol.com/1712992879832.png';
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
