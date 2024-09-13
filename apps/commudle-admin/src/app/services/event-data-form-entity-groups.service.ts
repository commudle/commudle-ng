import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { IEventDataFormEntityGroups } from 'apps/shared-models/event_data_form_entity_groups.model';
import { IPagination } from '@commudle/shared-models';

@Injectable({
  providedIn: 'root',
})
export class EventDataFormEntityGroupsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getEventDataFormEntityGroups(eventId): Observable<IEventDataFormEntityGroups> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEventDataFormEntityGroups>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.INDEX),
      { params: params },
    );
  }

  getEventDataFormEntityGroup(eventDataFormEntityGroupId): Observable<IEventDataFormEntityGroup> {
    const params = new HttpParams().set('event_data_form_entity_group_id', eventDataFormEntityGroupId);
    return this.http.get<IEventDataFormEntityGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.GET),
      { params: params },
    );
  }

  createEventDataFormEntityGroup(
    eventId,
    name,
    registrationTypeId,
    dataFormId,
    userDetails,
  ): Observable<IEventDataFormEntityGroup> {
    return this.http.post<IEventDataFormEntityGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.CREATE),
      {
        event_id: eventId,
        name: name,
        registration_type_id: registrationTypeId,
        data_form_id: dataFormId,
        user_details: userDetails,
      },
    );
  }

  deleteEventDataFormEntityGroup(eventDataFormEntityGroupId): Observable<any> {
    const params = new HttpParams().set('event_data_form_entity_group_id', eventDataFormEntityGroupId);
    return this.http.delete<any>(this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.DELETE), {
      params: params,
    });
  }

  updateRSVP(eventDataFormEntityGroupId): Observable<IEventDataFormEntityGroup> {
    return this.http.put<any>(this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.UPDATE_RSVP), {
      event_data_form_entity_group_id: eventDataFormEntityGroupId,
    });
  }

  toggleAllowCancellation(eventDataFormEntityGroupId): Observable<boolean> {
    return this.http.put<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.TOGGLE_ALLOW_CANCELLATION),
      {
        event_data_form_entity_group_id: eventDataFormEntityGroupId,
      },
    );
  }

  mailCSV(eventDataFormEntityGroupId): Observable<boolean> {
    const params = new HttpParams().set('event_data_form_entity_group_id', eventDataFormEntityGroupId);
    return this.http.get<boolean>(this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.EMAIL_CSV), {
      params,
    });
  }

  changeBulkRegistrationStatus(
    fromRegistrationStatus,
    toRegistrationStatus,
    eventDataFormEntityGroupId,
    changeCanceledStatus,
  ): Observable<boolean> {
    return this.http.put<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.CHANGE_BULK_REGISTRATION_STATUS),
      {
        from_registration_status: fromRegistrationStatus,
        to_registration_status: toRegistrationStatus,
        event_data_form_entity_group_id: eventDataFormEntityGroupId,
        canceled_change: changeCanceledStatus,
      },
    );
  }

  togglePaidTicket(eventDataFormEntityGroupId): Observable<boolean> {
    return this.http.put<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.TOGGLE_IS_PAID),
      {
        event_data_form_entity_group_id: eventDataFormEntityGroupId,
      },
    );
  }

  mailPaymentCSV(eventDataFormEntityGroupId): Observable<boolean> {
    const params = new HttpParams().set('event_data_form_entity_group_id', eventDataFormEntityGroupId);
    return this.http.get<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.EMAIL_PAYMENT_DETAILS_CSV),
      {
        params,
      },
    );
  }

  pGetPublicOpenDataForms(eventId): Observable<IEventDataFormEntityGroups> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEventDataFormEntityGroups>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.PUBLIC_OPEN_DATA_FORMS),
      { params },
    );
  }

  updateEventDataFormEntityGroup(
    eventDataFormEntityGroupId,
    dataFormEntityGroup,
    userDetails,
  ): Observable<IEventDataFormEntityGroup> {
    const params = new HttpParams().set('event_data_form_entity_group_id', eventDataFormEntityGroupId);
    return this.http.put<IEventDataFormEntityGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.UPDATE),
      { event_data_form_entity_group: dataFormEntityGroup.value, user_details: userDetails },
      { params },
    );
  }

  getIndexByCommunity(
    communityId: number | string,
    page: number,
    count: number,
    search = '',
  ): Observable<IEventDataFormEntityGroups> {
    let params = new HttpParams().set('community_id', communityId).set('page', page).set('count', count);
    if (search) {
      params = params.set('q', search);
    }
    return this.http.get<IEventDataFormEntityGroups>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.INDEX_BY_COMMUNITY),
      { params },
    );
  }

  getList(page: number, count: number, search = ''): Observable<IEventDataFormEntityGroups> {
    let params = new HttpParams().set('page', page).set('count', count);
    if (search) {
      params = params.set('q', search);
    }
    return this.http.get<IEventDataFormEntityGroups>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_DATA_FORM_ENTITY_GROUPS.LIST),
      { params },
    );
  }
}
