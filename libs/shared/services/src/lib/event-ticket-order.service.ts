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

  updateEventTicketOrder(additional_users: any, eventTicketOrderId, discount_code?): Observable<any> {
    let params = new HttpParams().set('event_ticket_order_id', eventTicketOrderId);
    if (discount_code) {
      params = params.set('discount_code', discount_code);
    }
    return this.http.put<any>(this.baseApiService.getRoute(API_ROUTES.EVENT_TICKET_ORDERS.UPDATE), additional_users, {
      params,
    });
  }

  showEventTicketOrder(edfegId): Observable<any> {
    const params = new HttpParams().set('event_data_form_entity_group_id', edfegId);
    return this.http.get<any>(this.baseApiService.getRoute(API_ROUTES.EVENT_TICKET_ORDERS.SHOW), {
      params,
    });
  }
}
