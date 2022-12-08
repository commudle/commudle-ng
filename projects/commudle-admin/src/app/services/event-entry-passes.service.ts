import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEventEntryPass } from 'projects/shared-models/event_entry_pass.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventEntryPassesService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getEntryPass(eventId: number, entryCode: string): Observable<IEventEntryPass> {
    let params = new HttpParams().set('event_id', eventId).set('unique_code', entryCode);
    return this.http.get<IEventEntryPass>(this.apiRoutesService.getRoute(API_ROUTES.EVENT_ENTRY_PASSES.SHOW), {
      params,
    });
  }

  getExitPass(eventId: number, entryCode: string): Observable<IEventEntryPass> {
    let params = new HttpParams().set('event_id', eventId).set('unique_code', entryCode);
    return this.http.get<IEventEntryPass>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_ENTRY_PASSES.VERIFY_FILLED_EVENT_FORMS),
      {
        params,
      },
    );
  }

  // this creates an entry pass for custom form registrations
  createEntryPass(dataFormEntityResponseGroupId): Observable<IEventEntryPass> {
    return this.http.post<IEventEntryPass>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_ENTRY_PASSES.CREATE_EVENT_ENTRY_PASS),
      {
        data_form_entity_response_group_id: dataFormEntityResponseGroupId,
      },
    );
  }

  createUserEventRegistrationEntryPass(userEventRegistrationId): Observable<IEventEntryPass> {
    return this.http.post<IEventEntryPass>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_ENTRY_PASSES.CREATE_USER_EVENT_REGISTRATION_ENTRY_PASS),
      {
        user_event_registration_id: userEventRegistrationId,
      },
    );
  }

  toggleAttendance(eventEntryPassId): Observable<IEventEntryPass> {
    return this.http.put<IEventEntryPass>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_ENTRY_PASSES.TOGGLE_ATTENDANCE),
      {
        event_entry_pass_id: eventEntryPassId,
      },
    );
  }

  toggleUninvited(eventEntryPassId): Observable<IEventEntryPass> {
    return this.http.put<IEventEntryPass>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_ENTRY_PASSES.TOGGLE_UNINVITED),
      {
        event_entry_pass_id: eventEntryPassId,
      },
    );
  }

  autoOnlineAttendance(eventId): Observable<IEventEntryPass> {
    return this.http.put<IEventEntryPass>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_ENTRY_PASSES.AUTO_ONLINE_ATTENDANCE),
      {
        event_id: eventId,
      },
    );
  }
}
