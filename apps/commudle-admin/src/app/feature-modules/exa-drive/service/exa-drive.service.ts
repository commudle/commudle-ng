import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExaDriveService {
  private baseUrl = 'https://api.coingecko.com/api/v3/coins/';
  private apiKey = 'CG-k6ULLQKK2YngfzZ5yUN3nMpZ';

  constructor() {}

  getCoinData(coinId) {
    const apiUrl = `${this.baseUrl}${coinId}?localization=false&tickers=false&market_data=false&community_data=false`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': this.apiKey,
      },
    };

    return fetch(apiUrl, options).then((response) => response.json());
  }
}
