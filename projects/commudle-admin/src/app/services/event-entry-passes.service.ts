import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IEventEntryPass } from 'projects/shared-models/event_entry_pass.model';

@Injectable({
  providedIn: 'root'
})
export class EventEntryPassesService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  createEntryPass(dataFormEntityResponseGroupId): Observable<IEventEntryPass> {
    return this.http.post<IEventEntryPass>(
      this.apiRoutesService.getRoute(API_ROUTES.CREATE_EVENT_ENTRY_PASS), {
        data_form_entity_response_group_id: dataFormEntityResponseGroupId
       }
    );
  }

  toggleAttendance(eventEntryPassId): Observable<IEventEntryPass> {
    return this.http.patch<IEventEntryPass>(
      this.apiRoutesService.getRoute(API_ROUTES.TOGGLE_ATTENDANCE), {
        event_entry_pass_id: eventEntryPassId
       }
    );
  }


  toggleUninvited(eventEntryPassId): Observable<IEventEntryPass> {
    return this.http.patch<IEventEntryPass>(
      this.apiRoutesService.getRoute(API_ROUTES.TOGGLE_UNINVITED), {
        event_entry_pass_id: eventEntryPassId
       }
    );
  }

}
