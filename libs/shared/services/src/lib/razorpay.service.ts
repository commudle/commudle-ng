import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination, IRazorpayAccount, IStripeAccount } from '@commudle/shared-models';
import { API_ROUTES } from './api-routes.constant';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StripeHandlerService {
  constructor(private baseApiService: BaseApiService, private http: HttpClient) {}

  createRazorpayAccount(communityId, details): Observable<IRazorpayAccount> {
    return this.http.post<IRazorpayAccount>(this.baseApiService.getRoute(API_ROUTES.STRIPE_HANDLER.CREATE), {
      community_id: communityId,
      razorpay_account_details: details,
    });
  }

  indexStripeAccount(communityId): Observable<IPagination<IStripeAccount>> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<IPagination<IStripeAccount>>(this.baseApiService.getRoute(API_ROUTES.STRIPE_HANDLER.INDEX), {
      params,
    });
  }
}
