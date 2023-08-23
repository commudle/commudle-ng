import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination, IStripeAccount } from '@commudle/shared-models';
import { API_ROUTES, BaseApiService } from '@commudle/shared-services';
import { Observable } from 'rxjs';
declare let Stripe: any;


@Injectable({
  providedIn: 'root',
})
export class StripeHandlerService {
  public stripe: any;

  constructor(private baseApiService: BaseApiService, private http: HttpClient) {
    this.stripe = Stripe(
      'pk_test_51NIQahSAaAm97WzmtpZtqYAuI1cCfN7LAJPoy8SmBpJqXQ5c7gnmOXXS9VtXa1b6YvCa1Uc9bX3Ra9ZLjm4AQBSs00en3kVojH',
    );
  }

  indexStripeAccount(communityId): Observable<IPagination<IStripeAccount>> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<IPagination<IStripeAccount>>(this.baseApiService.getRoute(API_ROUTES.STRIPE_HANDLER.INDEX), {
      params,
    });
  }

  connectStripeAccount(stripe_connect_account, sourceUrl: string, communityId): Observable<any> {
    return this.http.post<any>(this.baseApiService.getRoute(API_ROUTES.STRIPE_HANDLER.CREATE), {
      source_url: sourceUrl,
      community_id: communityId,
      stripe_connect_account: stripe_connect_account.value,
    });
  }

  retrieveStripeAccount(uuid: string): Observable<any> {
    const params = new HttpParams().set('uuid', uuid);
    return this.http.get<any>(this.baseApiService.getRoute(API_ROUTES.STRIPE_HANDLER.RETRIEVE_ACCOUNT), {
      params,
    });
  }
}
