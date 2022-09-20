import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES, ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';
import { IHmsClient } from '../models/hms-client.model';

@Injectable({
  providedIn: 'root',
})
export class HmsApiService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getClientToken(roomId): Observable<IHmsClient> {
    const params = new HttpParams().set('hms_room_id', roomId);

    return this.http.get<IHmsClient>(this.apiRoutesService.getRoute(API_ROUTES.HMS_CLIENT.CLIENT_TOKEN), { params });
  }
}
