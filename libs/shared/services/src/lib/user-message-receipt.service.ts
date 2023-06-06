import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from './api-routes.constant';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserMessageReceiptService {
  constructor(private http: HttpClient, private baseApiService: BaseApiService) {}

  createReceipt(data: Array<{ user_message_id: number; seen_at: Date }>): Observable<boolean> {
    return this.http.post<boolean>(this.baseApiService.getRoute(API_ROUTES.USER_MESSAGE_RECEIPTS.CREATE), {
      data: JSON.stringify(data),
    });
  }
}
