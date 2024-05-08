import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from './base-api.service';
import { IDappWallet } from '@commudle/shared-models';
import { Observable } from 'rxjs';
import { API_ROUTES } from './api-routes.constant';

@Injectable({
  providedIn: 'root',
})
export class DappWalletService {
  constructor(private http: HttpClient, private baseApiService: BaseApiService) {}

  getWallets(): Observable<IDappWallet[]> {
    return this.http.get<IDappWallet[]>(this.baseApiService.getRoute(API_ROUTES.DAPP_WALLETS.INDEX));
  }

  createWallet(formData): Observable<IDappWallet> {
    return this.http.post<IDappWallet>(this.baseApiService.getRoute(API_ROUTES.DAPP_WALLETS.CREATE), {
      dapp_wallet: formData,
    });
  }

  destroyWallet(walletId): Observable<boolean> {
    return this.http.delete<boolean>(this.baseApiService.getRoute(API_ROUTES.DAPP_WALLETS.DELETE), {
      params: { dapp_wallet_id: walletId },
    });
  }
}
