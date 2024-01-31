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
    datFormId,
  ): Observable<IHackathonResponseGroup> {
    const params = new HttpParams().set('hackathon_id', hackathonId);

    return this.http.post<IHackathonResponseGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_RESPONSE_GROUP.CREATE),
      {
        hackathon_response_group: {
          user_details: userDetails,
          registration_type_id: registrationTypeId,
          name: name,
        },
        data_form_id: datFormId,
      },
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

  pShowHackathonResponseGroup(hackathonResponseGroupId): Observable<IHackathonResponseGroup> {
    const params = new HttpParams().set('hackathon_response_group_id', hackathonResponseGroupId);
    return this.http.get<IHackathonResponseGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_RESPONSE_GROUP.PUBLIC_SHOW),
      {
        params,
      },
    );
  }
}
