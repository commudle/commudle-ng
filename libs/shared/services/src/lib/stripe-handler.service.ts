import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StripeHandlerService {
  constructor(private apiRoutesService: ApiRoutesService, private http: HttpClient) {}

  indexStripeAccount(communityId): Observable<any> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.STRIPE_HANDLER.INDEX), {
      params,
    });
  }

  connectStripeAccount(sourceUrl: string, communityId): Observable<any> {
    return this.http.post<any>(this.apiRoutesService.getRoute(API_ROUTES.STRIPE_HANDLER.CREATE), {
      source_url: sourceUrl,
      community_id: communityId,
    });
  }

  retrieveStripeAccount(accountId: string, communityId): Observable<any> {
    const params = new HttpParams().set('account_id', accountId).set('community_id', communityId);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.STRIPE_HANDLER.RETRIEVE_ACCOUNT), {
      params,
    });
  }
}
