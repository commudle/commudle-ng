import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IEventDataFormEntityGroup } from 'projects/shared-models/event_data_form_enity_group.model';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IEventDataFormEntityGroups } from 'projects/shared-models/event_data_form_entity_groups.model';

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

}
