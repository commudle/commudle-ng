/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IPagination,
  IPaginationCount,
  IRazorpayAccount,
  IRazorpayOrder,
  IRazorpayPayment,
} from '@commudle/shared-models';
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

  createOrUpdatePayment(response, hasError: boolean = false, paymentId?: string): Observable<any> {
    let params = new HttpParams();
    let requestBody: { has_error?: boolean; payment_error?: any; payment_details?: any } = {}; // Define the type of requestBody

    if (paymentId) {
      params = new HttpParams().set('payment_id', paymentId);
    }
    if (hasError === true) {
      requestBody = { has_error: hasError, payment_error: response };
    } else {
      requestBody = { has_error: hasError, payment_details: response };
    }
    return this.http.put<any>(this.baseApiService.getRoute(API_ROUTES.RAZORPAY.CREATE_OR_UPDATE_PAYMENT), requestBody, {
      params,
    });
  }

  getAllPaymentDetails(
    edfegId: number | string,
    page = 1,
    count = 10,
    search = '',
  ): Observable<IPaginationCount<IRazorpayPayment>> {
    let params = new HttpParams().set('edfeg_id', edfegId).set('page', page).set('count', count);
    if (search) {
      params = params.set('q', search);
    }
    return this.http.get<IPaginationCount<IRazorpayPayment>>(
      this.baseApiService.getRoute(API_ROUTES.RAZORPAY.GET_ALL_PAYMENT_DETAILS),
      {
        params,
      },
    );
  }

  createPaymentTransfer(razorpayPaymentId: number): Observable<IPaginationCount<IRazorpayPayment>> {
    const params = new HttpParams().set('razorpay_payment_id', razorpayPaymentId);
    return this.http.get<IPaginationCount<IRazorpayPayment>>(
      this.baseApiService.getRoute(API_ROUTES.RAZORPAY.CREATE_TRANSFER),
      {
        params,
      },
    );
  }

  getTransferDetails(transferId: string): Observable<any> {
    const params = new HttpParams().set('transfer_id', transferId);
    return this.http.get<any>(this.baseApiService.getRoute(API_ROUTES.RAZORPAY.GET_TRANSFER_DETAILS), {
      params,
    });
  }

  createMissingRzpPayment(paymentId): Observable<IRazorpayOrder> {
    return this.http.post<IRazorpayOrder>(
      this.baseApiService.getRoute(API_ROUTES.RAZORPAY.CREATE_MISSING_RZP_PAYMENT),
      { payment_id: paymentId },
    );
  }
}
