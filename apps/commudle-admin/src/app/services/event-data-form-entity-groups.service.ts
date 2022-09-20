import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IEventDataFormEntityGroup } from '@commudle/shared-models';
import { Observable } from 'rxjs';
import { ApiRoutesService } from '@commudle/shared-services';
import { API_ROUTES } from '@commudle/shared-services';
import { IEventDataFormEntityGroups } from '@commudle/shared-models';

@Injectable({
  providedIn: 'root'
})
export class EventDataFormEntityGroupsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }

  getEventDataFormEntityGroups(eventId): Observable<IEventDataFormEntityGroups> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEventDataFormEntityGroups>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.INDEX), { params: params }
    );
  }

  getEventDataFormEntityGroup(eventDataFormEntityGroupId): Observable<IEventDataFormEntityGroup> {
    let params = new HttpParams().set('event_data_form_entity_group_id', eventDataFormEntityGroupId);
    return this.http.get<IEventDataFormEntityGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.GET), { params: params }
    );
  }

  createEventDataFormEntityGroup(eventId, name, registrationTypeId, dataFormId): Observable<IEventDataFormEntityGroup> {

    return this.http.post<IEventDataFormEntityGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.CREATE), {
        event_id: eventId,
        name: name,
        registration_type_id: registrationTypeId,
        data_form_id: dataFormId

       }
    );
  }

  deleteEventDataFormEntityGroup(eventDataFormEntityGroupId): Observable<any> {
    let params = new HttpParams().set('event_data_form_entity_group_id', eventDataFormEntityGroupId);
    return this.http.delete<any>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.DELETE), { params: params }
    );
  }


  updateRSVP(eventDataFormEntityGroupId): Observable<IEventDataFormEntityGroup> {
    return this.http.put<any>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.UPDATE_RSVP),
      {
        event_data_form_entity_group_id: eventDataFormEntityGroupId
       }
    );
  }


  mailCSV(eventDataFormEntityGroupId): Observable<boolean> {
    let params = new HttpParams().set('event_data_form_entity_group_id', eventDataFormEntityGroupId);
    return this.http.get<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.EMAIL_CSV),
      { params }
    );
  }


  changeBulkRegistrationStatus(registrationStatusId, eventDataFormEntityGroupId, changeCanceledStatus): Observable<boolean> {

    return this.http.put<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.CHANGE_BULK_REGISTRATION_STATUS), {
        registration_status_id: registrationStatusId,
        event_data_form_entity_group_id: eventDataFormEntityGroupId,
        canceled_change: changeCanceledStatus
       }
    );
  }


  pGetPublicOpenDataForms(eventId): Observable<IEventDataFormEntityGroups> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEventDataFormEntityGroups>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.PUBLIC_OPEN_DATA_FORMS),
      { params }
    );
  }

}
