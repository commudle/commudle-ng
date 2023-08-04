import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
      'pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3',
    );
  }

  indexStripeAccount(communityId): Observable<any> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<any>(this.baseApiService.getRoute(API_ROUTES.STRIPE_HANDLER.INDEX), {
      params,
    });
  }

  connectStripeAccount(sourceUrl: string, communityId): Observable<any> {
    return this.http.post<any>(this.baseApiService.getRoute(API_ROUTES.STRIPE_HANDLER.CREATE), {
      source_url: sourceUrl,
      community_id: communityId,
    });
  }

  retrieveStripeAccount(uuid: string): Observable<any> {
    const params = new HttpParams().set('uuid', uuid);
    return this.http.get<any>(this.baseApiService.getRoute(API_ROUTES.STRIPE_HANDLER.RETRIEVE_ACCOUNT), {
      params,
    });
  }
}
