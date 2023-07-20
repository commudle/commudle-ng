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

  connectStripeAccount(sourceUrl: string): Observable<any> {
    const params = new HttpParams().set('source_url', sourceUrl);
    return this.http.post<any>(this.apiRoutesService.getRoute(API_ROUTES.STRIPE_HANDLER.CREATE), {
      params,
    });
  }

  retrieveStripeAccount(accountId: string): Observable<any> {
    const params = new HttpParams().set('account_id', accountId);
    return this.http.post<any>(this.apiRoutesService.getRoute(API_ROUTES.STRIPE_HANDLER.RETRIEVE_ACCOUNT), {
      params,
    });
  }
}
