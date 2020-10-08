import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IEventUpdates } from 'projects/shared-models/event_updates.model';
import { IEventUpdate } from 'projects/shared-models/event_update.model';
import { IEventSimpleRegistration } from 'projects/shared-models/event_simple_registration.model';

@Injectable({
  providedIn: 'root'
})
export class EventSimpleRegistrationsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  findOrCreate(eventId): Observable<IEventSimpleRegistration> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEventSimpleRegistration>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_SIMPLE_REGISTATIONS.FIND_OR_CREATE), { params }
    );
  }

  toggleStatus(eventSimpleRegistrationId): Observable<IEventSimpleRegistration> {
    return this.http.put<IEventSimpleRegistration>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_SIMPLE_REGISTATIONS.TOGGLE_STATUS), {
        event_simple_registration_id: eventSimpleRegistrationId
       }
    );
  }


  emailCSV(eventId): Observable<boolean> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_SIMPLE_REGISTATIONS.EMAIL_CSV), {params}
    );
  }



  pGet(eventId): Observable<IEventSimpleRegistration> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEventSimpleRegistration>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_SIMPLE_REGISTATIONS.PUBLIC.SHOW), { params }
    );
  }


}
