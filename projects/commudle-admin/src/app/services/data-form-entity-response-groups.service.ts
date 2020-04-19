import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IDataFormEntityResponseGroup } from 'projects/shared-models/data_form_entity_response_group.model';
import { IDataFormEntityResponseGroups } from 'projects/shared-models/data_form_entity_response_groups.model';

@Injectable({
  providedIn: 'root'
})
export class DataFormEntityResponseGroupsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  getEventDataFormResponses(eventDataFormEntityGroupId, page, count): Observable<IDataFormEntityResponseGroups> {
    let params = new HttpParams().set(
      'event_data_form_entity_group_id', eventDataFormEntityGroupId)
      .set('count', count)
      .set('page', page);
    return this.http.get<IDataFormEntityResponseGroups>(
      this.apiRoutesService.getRoute(API_ROUTES.GET_EVENT_DATA_FORM_RESPONSES), { params }
    );
  }

  updateEventRegistrationStatus(registrationStatusId, dataFormEntityResponseGroupId): Observable<IDataFormEntityResponseGroup> {

    return this.http.patch<IDataFormEntityResponseGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.UPDATE_EVENT_REGISTRATION_STATUS), {
        data_form_entity_response_group_id: dataFormEntityResponseGroupId,
        registration_status_id: registrationStatusId
       }
    );

  }

  // TODO
  sendRSVPMail(dataFormEntityResponseGroupId) {

  }

  // TODO
  sendEntryPassMail(dataFormEntityResponseGroupId) {

  }


  getEventSpeakers(eventId): Observable<IDataFormEntityResponseGroups> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<IDataFormEntityResponseGroups>(
      this.apiRoutesService.getRoute(API_ROUTES.GET_EVENT_SPEAKERS), { params }
    );
  }

}
