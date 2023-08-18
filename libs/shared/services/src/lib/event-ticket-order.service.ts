import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES, BaseApiService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventTicketOrderService {
  constructor(private baseApiService: BaseApiService, private http: HttpClient) {}

  createEventTicketOrder(additional_users: any, eventDataFormEntityGroupId, discount_code?): Observable<any> {
    let params = new HttpParams().set('event_data_form_entity_group_id', eventDataFormEntityGroupId);
    if (discount_code) {
      params = params.set('discount_code', discount_code);
    }
    return this.http.post<any>(this.baseApiService.getRoute(API_ROUTES.EVENT_TICKET_ORDERS.CREATE), additional_users, {
      params,
    });
  }

  checkEventTicketOrder(stripe_payment_intent_id): Observable<any> {
    const params = new HttpParams().set('stripe_payment_intent_id', stripe_payment_intent_id);
    return this.http.post<any>(this.baseApiService.getRoute(API_ROUTES.EVENT_TICKET_ORDERS.CHECK), {
      params,
    });
  }
}
