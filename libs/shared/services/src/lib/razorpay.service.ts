/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination, IRazorpayAccount, IRazorpayOrder } from '@commudle/shared-models';
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

  createOrFindOrder(orderDetails, etoId): Observable<IRazorpayOrder> {
    const params = new HttpParams().set('eto_id', etoId);
    return this.http.post<IRazorpayOrder>(
      this.baseApiService.getRoute(API_ROUTES.RAZORPAY.FIND_OR_CREATE_ORDER),
      {
        order_details: orderDetails,
      },
      { params },
    );
  }

  createOrUpdatePayment(response, paymentId?: string): Observable<any> {
    let params = new HttpParams();
    if (paymentId) {
      params = new HttpParams().set('payment_id', paymentId);
    }
    return this.http.put<any>(
      this.baseApiService.getRoute(API_ROUTES.RAZORPAY.CREATE_OR_UPDATE_PAYMENT),
      {
        payment_error: response,
      },
      { params },
    );
  }
}
