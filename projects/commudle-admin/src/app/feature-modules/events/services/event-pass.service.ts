import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';

@Injectable({
  providedIn: 'root',
})
export class EventPassService {
  constructor(private http: HttpClient, private apiRouteService: ApiRoutesService) {}

  getEntryPass(eventId: string, entryCode: string) {
    let params = new HttpParams().set('event_id', eventId).set('unique_code', entryCode);
    return this.http.get<any>(this.apiRouteService.getRoute(API_ROUTES.EVENT_ENTRY_PASSES.SHOW), { params });
  }
}
