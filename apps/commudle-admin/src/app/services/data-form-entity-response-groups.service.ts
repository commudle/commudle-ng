import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from '@commudle/shared-services';
import { API_ROUTES } from '@commudle/shared-services';
import { IDataFormEntityResponseGroup } from '@commudle/shared-models';
import { IDataFormEntityResponseGroups } from '@commudle/shared-models';

@Injectable({
  providedIn: 'root'
})
export class DataFormEntityResponseGroupsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  getEventDataFormResponses(eventDataFormEntityGroupId, filterQuery, registrationStatusId, page, count): Observable<IDataFormEntityResponseGroups> {
    let params = new HttpParams().set(
      'event_data_form_entity_group_id', eventDataFormEntityGroupId)
      .set('count', count)
      .set('page', page)
      .set('registration_status_id', registrationStatusId)
      .set('query', filterQuery);
    return this.http.get<IDataFormEntityResponseGroups>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITY_RESPONSE_GROUPS.GET_EVENT_DATA_FORM_RESPONSES), { params }
    );
  }

  updateEventRegistrationStatus(registrationStatusId, dataFormEntityResponseGroupId): Observable<IDataFormEntityResponseGroup> {

    return this.http.put<IDataFormEntityResponseGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITY_RESPONSE_GROUPS.UPDATE_EVENT_REGISTRATION_STATUS), {
        data_form_entity_response_group_id: dataFormEntityResponseGroupId,
        registration_status_id: registrationStatusId
       }
    );

  }


  getEventSpeakers(eventId): Observable<IDataFormEntityResponseGroups> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<IDataFormEntityResponseGroups>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITY_RESPONSE_GROUPS.GET_EVENT_SPEAKERS), { params }
    );
  }


  updateRSVPStatus(token, rsvpStatus): Observable<any> {
    return this.http.put<any>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITY_RESPONSE_GROUPS.UPDATE_RSVP),
      {token, rsvp_status: rsvpStatus}
    );
  }



  pGetEventSpeakers(eventId): Observable<IDataFormEntityResponseGroups> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<IDataFormEntityResponseGroups>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITY_RESPONSE_GROUPS.PUBLIC_GET_EVENT_SPEAKERS), { params }
    );
  }

  pEventInterestedUsers(eventId): Observable<any> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITY_RESPONSE_GROUPS.PUBLIC_EVENT_INTERESTED_USERS), { params }
    );
  }

}
