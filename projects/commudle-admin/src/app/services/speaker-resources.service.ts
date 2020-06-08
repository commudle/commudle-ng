import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IRegistrationTypes } from 'projects/shared-models/registration_types.model';
import { ISpeakerResource } from 'projects/shared-models/speaker_resource.model';
import { ISpeakerResources } from 'projects/shared-models/speaker_resources.model';

@Injectable({
  providedIn: 'root'
})
export class SpeakerResourcesService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  getByToken(token): Observable<ISpeakerResource> {
    const params = new HttpParams().set('token', token);
    return this.http.get<ISpeakerResource>(
      this.apiRoutesService.getRoute(API_ROUTES.SPEAKER_RESOURCES.SHOW_BY_TOKEN), {params}
    );
  }

  createOrUpdateByToken(token, speakerResourceData): Observable<ISpeakerResource> {
    return this.http.post<ISpeakerResource>(
      this.apiRoutesService.getRoute(API_ROUTES.SPEAKER_RESOURCES.CREATE_OR_UPDATE_BY_TOKEN),
      { token, speaker_resource: speakerResourceData }
    );
  }

  pCommunitySpeakerResources(communityId): Observable<ISpeakerResources> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<ISpeakerResources>(
      this.apiRoutesService.getRoute(API_ROUTES.SPEAKER_RESOURCES.PUBLIC.COMMUNITY_RESOURCES),
      { params }
    );
  }

}
