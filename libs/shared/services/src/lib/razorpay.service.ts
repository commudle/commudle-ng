import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination, IRazorpayAccount, IStripeAccount } from '@commudle/shared-models';
import { API_ROUTES } from './api-routes.constant';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RazorpayService {
  constructor(private baseApiService: BaseApiService, private http: HttpClient) {}

  createRazorpayAccount(parentId, parentType, accountDetails, settlementsDetails): Observable<IRazorpayAccount> {
    let params = new HttpParams();
    switch (parentType) {
      case 'Kommunity': {
        params = params.set('community_id', parentId);
        break;
      }
      case 'CommunityGroup': {
        params = params.set('community_group_id', parentId);
        break;
      }
    }
    return this.http.post<IRazorpayAccount>(
      this.baseApiService.getRoute(API_ROUTES.RAZORPAY.CREATE),
      {
        account: accountDetails,
        settlements: settlementsDetails,
      },
      { params },
    );
  }

  indexRazorpayAccounts(communityId): Observable<IPagination<IRazorpayAccount>> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<IPagination<IRazorpayAccount>>(this.baseApiService.getRoute(API_ROUTES.RAZORPAY.INDEX), {
      params,
    });
  }
}
