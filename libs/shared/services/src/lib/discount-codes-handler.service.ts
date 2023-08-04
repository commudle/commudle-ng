import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDiscountCode } from '@commudle/shared-models';
import { API_ROUTES, BaseApiService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiscountCodesService {
  constructor(private baseApiService: BaseApiService, private http: HttpClient) {}

  indexDiscountCodes(eventId): Observable<IDiscountCode[]> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IDiscountCode[]>(this.baseApiService.getRoute(API_ROUTES.DISCOUNT_CODES.INDEX), {
      params,
    });
  }

  createDiscountCode(discount_code: any, eventId): Observable<any> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.post<any>(this.baseApiService.getRoute(API_ROUTES.DISCOUNT_CODES.CREATE), discount_code, {
      params,
    });
  }

  updateDiscountCodes(discount_code: any, discountCodeId): Observable<any> {
    const params = new HttpParams().set('discount_code_id', discountCodeId);
    return this.http.put<any>(this.baseApiService.getRoute(API_ROUTES.DISCOUNT_CODES.UPDATE), discount_code, {
      params,
    });
  }
}
