import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserMessageReceiptService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  createReceipt(data: Array<{ user_message_id: number; seen_at: Date }>): Observable<boolean> {
    return this.http.post<boolean>(this.apiRoutesService.getRoute(API_ROUTES.USER_MESSAGE_RECEIPTS.CREATE), {
      data: JSON.stringify(data),
    });
  }
}
