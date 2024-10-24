import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaymentDetail } from '@commudle/shared-models';
import { API_ROUTES } from './api-routes.constant';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentSettingService {
  constructor(private baseApiService: BaseApiService, private http: HttpClient) {}

  indexPaymentSettings(eventDataFormEntityGroupId): Observable<IPaymentDetail> {
    const params = new HttpParams().set('event_data_form_entity_group_id', eventDataFormEntityGroupId);
    return this.http.get<IPaymentDetail>(this.baseApiService.getRoute(API_ROUTES.PAID_TICKET_SETTINGS.INDEX), {
      params,
    });
  }

  pIndexPaymentSettings(eventDataFormEntityGroupId): Observable<IPaymentDetail> {
    const params = new HttpParams().set('event_data_form_entity_group_id', eventDataFormEntityGroupId);
    return this.http.get<IPaymentDetail>(this.baseApiService.getRoute(API_ROUTES.PAID_TICKET_SETTINGS.PUBLIC.SHOW), {
      params,
    });
  }

  createPaymentSettings(paid_ticket_setting: any, eventDataFormEntityGroupId): Observable<IPaymentDetail> {
    const params = new HttpParams().set('event_data_form_entity_group_id', eventDataFormEntityGroupId);
    return this.http.post<IPaymentDetail>(
      this.baseApiService.getRoute(API_ROUTES.PAID_TICKET_SETTINGS.CREATE),
      paid_ticket_setting,
      {
        params,
      },
    );
  }

  updateTicketDetails(paid_ticket_setting: any, paidTicketSettingId): Observable<IPaymentDetail> {
    const params = new HttpParams().set('paid_ticket_setting_id', paidTicketSettingId);
    return this.http.put<IPaymentDetail>(
      this.baseApiService.getRoute(API_ROUTES.PAID_TICKET_SETTINGS.UPDATE),
      paid_ticket_setting,
      {
        params,
      },
    );
  }

  calculateCommudleFeeAmount(price: number, taxPercentage: number): Observable<number> {
    const params = new HttpParams().set('price', price).set('tax_percentage', taxPercentage);
    return this.http.get<number>(
      this.baseApiService.getRoute(API_ROUTES.PAID_TICKET_SETTINGS.CALCULATE_COMMUDLE_FEE_AMOUNT),
      {
        params,
      },
    );
  }
}
