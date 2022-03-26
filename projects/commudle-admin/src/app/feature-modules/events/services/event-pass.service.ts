import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEventPass } from 'projects/shared-models/event-pass.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';

@Injectable({
  providedIn: 'root'
})
export class EventPassService {

  constructor(
    private http: HttpClient,
    private apiRouteService: ApiRoutesService
  ) { }

  getEntryPass(eventId: string, entryCode: string){
    let params = new HttpParams().set('event_id', eventId);
    params = params.set('unique_code', entryCode);

    return this.http.get<any>(this.apiRouteService.getRoute(API_ROUTES.EVENT_ENTRY_PASSES.SHOW), { params });
  }

  toggleAttendance(entryPassId: number){
    const params = new HttpParams().set('event_entry_pass_id', entryPassId);
    return this.http.put<IEventPass>(this.apiRouteService.getRoute(API_ROUTES.EVENT_ENTRY_PASSES.TOGGLE_ATTENDANCE), { params });
  }
}
