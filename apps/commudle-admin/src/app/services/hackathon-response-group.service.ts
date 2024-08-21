import { Injectable } from '@angular/core';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IHackathonResponseGroup } from 'apps/shared-models/hackathon-response-group.model';
@Injectable({
  providedIn: 'root',
})
export class HackathonResponseGroupService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  createHackathonResponseGroup(
    userDetails,
    hackathonId,
    registrationTypeId,
    name,
    dataFormId?,
  ): Observable<IHackathonResponseGroup> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    const requestBody = {
      hackathon_response_group: {
        user_details: userDetails,
        registration_type_id: registrationTypeId,
        name: name,
      },
    };

    if (dataFormId !== '') {
      requestBody['data_form_id'] = dataFormId;
    }

    return this.http.post<IHackathonResponseGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_RESPONSE_GROUP.CREATE),
      requestBody,
      { params },
    );
  }

  updateHackathonResponseGroup(
    userDetails,
    hackathonResponseGroupId,
    dataFormId?,
  ): Observable<IHackathonResponseGroup> {
    const params = new HttpParams().set('hackathon_response_group_id', hackathonResponseGroupId);
    const requestBody = {
      hackathon_response_group: {
        user_details: userDetails,
      },
    };

    if (dataFormId !== '') {
      requestBody['data_form_id'] = dataFormId;
    }
    return this.http.put<IHackathonResponseGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_RESPONSE_GROUP.UPDATE),
      requestBody,
      { params },
    );
  }
  showHackathonResponseGroup(hackathonId): Observable<IHackathonResponseGroup> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.get<IHackathonResponseGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_RESPONSE_GROUP.SHOW),
      {
        params,
      },
    );
  }

  // PUBLIC API

  pShowHackathonResponseGroup(hackathonId: number): Observable<IHackathonResponseGroup> {
    const params = new HttpParams().set('hackathon_id', Number(hackathonId));
    return this.http.get<IHackathonResponseGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_RESPONSE_GROUP.PUBLIC.SHOW),
      {
        params,
      },
    );
  }

  pFetchHackathonResponseGroup(hackathonResponseGroupId: number): Observable<IHackathonResponseGroup> {
    const params = new HttpParams().set('hackathon_response_group_id', hackathonResponseGroupId);
    return this.http.get<IHackathonResponseGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_RESPONSE_GROUP.PUBLIC.FETCH_HACKATHON_RESPONSE_GROUP),
      {
        params,
      },
    );
  }
}
