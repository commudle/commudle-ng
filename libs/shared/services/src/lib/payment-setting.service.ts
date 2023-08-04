import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDiscountCode } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentSettingService {
  constructor(private apiRoutesService: ApiRoutesService, private http: HttpClient) {}

  indexPaymentSettings(eventDataFormEntityGroupId): Observable<any> {
    const params = new HttpParams().set('event_data_form_entity_group_id', eventDataFormEntityGroupId);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.PAID_TICKET_SETTINGS.INDEX), {
      params,
    });
  }

  createPaymentSettings(paid_ticket_setting: any, eventDataFormEntityGroupId): Observable<any> {
    const params = new HttpParams().set('event_data_form_entity_group_id', eventDataFormEntityGroupId);
    return this.http.post<any>(
      this.apiRoutesService.getRoute(API_ROUTES.PAID_TICKET_SETTINGS.CREATE),
      paid_ticket_setting,
      {
        params,
      },
    );
  }

  updateTicketDetails(paid_ticket_setting: any, paidTicketSettingId): Observable<any> {
    const params = new HttpParams().set('paid_ticket_setting_id', paidTicketSettingId);
    return this.http.put<any>(
      this.apiRoutesService.getRoute(API_ROUTES.PAID_TICKET_SETTINGS.UPDATE),
      paid_ticket_setting,
      {
        params,
      },
    );
  }
}
