import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDappWallet } from '@commudle/shared-models';
import { API_ROUTES, BaseApiService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DappWalletService {
  constructor(private http: HttpClient, private baseApiService: BaseApiService) {}

  getWallets(parent_id: number, parent_type: 'Event'): Observable<IDappWallet[]> {
    const params = new HttpParams().set('parent_id', parent_id.toString()).set('parent_type', parent_type);
    return this.http.get<IDappWallet[]>(this.baseApiService.getRoute(API_ROUTES.DAPP_WALLETS.INDEX), { params });
  }

  createWallet(formData): Observable<IDappWallet> {
    return this.http.post<IDappWallet>(this.baseApiService.getRoute(API_ROUTES.DAPP_WALLETS.CREATE), {
      dapp_wallet: formData,
    });
  }

  destroyWallet(walletId: number): Observable<boolean> {
    const params = new HttpParams().set('dapp_wallet_id', walletId.toString());
    return this.http.delete<boolean>(this.baseApiService.getRoute(API_ROUTES.DAPP_WALLETS.DELETE), { params });
  }
}
