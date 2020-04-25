import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IEvent } from 'projects/shared-models/event.model';
import { IEventLocation } from 'projects/shared-models/event-location.model';
import { IDataFormEntityResponseGroup } from 'projects/shared-models/data_form_entity_response_group.model';
import { IDataFormEntityResponseGroups } from 'projects/shared-models/data_form_entity_response_groups.model';
import { IEvents } from 'projects/shared-models/events.model';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }



  updateEvent(event, event_id, community): Observable<IEvent> {
    return this.http.put<IEvent>(
      this.apiRoutesService.getRoute(API_ROUTES.UPDATE_EVENT),
      {
        event,
        community_id: community.id,
        id: event_id
      }
    );
  }


  createEvent(event, community): Observable<IEvent> {
    return this.http.post<IEvent>(
      this.apiRoutesService.getRoute(API_ROUTES.CREATE_EVENT),
      {
        event: event,
        community_id: community.id
      }
    );
  }


  community_events_for_email(communityId): Observable<IEvents> {
    let params = new HttpParams().set('community_id', communityId);
    return this.http.get<IEvents>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_EVENTS_FOR_EMAIL), {params}
    );
  }

}
