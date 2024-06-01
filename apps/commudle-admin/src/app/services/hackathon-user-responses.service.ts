import { Injectable } from '@angular/core';
import { API_ROUTES } from '@commudle/shared-services';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { IHackathonUserResponse } from 'apps/shared-models/hackathon-user-response.model';
@Injectable({
  providedIn: 'root',
})
export class HackathonUserResponsesService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  createHackathonResponseGroup(dataForm, hackathonResponseGroupId): Observable<IHackathonUserResponse> {
    const params = new HttpParams().set('hackathon_response_group_id', hackathonResponseGroupId);
    return this.http.post<IHackathonUserResponse>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_USER_RESPONSE.CREATE),
      {
        hackathon_user_response: dataForm,
      },
      { params },
    );
  }

  getExistingHackathonUserResponses(hackathonResponseGroupId): Observable<IHackathonUserResponse[]> {
    const params = new HttpParams().set('hackathon_response_group_id', hackathonResponseGroupId);
    return this.http.get<IHackathonUserResponse[]>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_USER_RESPONSE.GET_EXISTING_HACKATHON_USER_RESPONSES),
      { params },
    );
  }

  updateHackathonResponseGroup(dataForm, hackathonUserResponseId): Observable<IHackathonUserResponse> {
    const params = new HttpParams().set('hackathon_user_response_id', hackathonUserResponseId);
    return this.http.put<any>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_USER_RESPONSE.UPDATE),
      {
        hackathon_user_response: dataForm,
      },
      { params },
    );
  }

  updateTeamDetails(dataForm, hackathonUserResponseId): Observable<IHackathonUserResponse> {
    const params = new HttpParams().set('hackathon_user_response_id', hackathonUserResponseId);
    return this.http.put<any>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_USER_RESPONSE.UPDATE_TEAM_DETAILS),
      {
        hackathon_team: dataForm,
      },
      { params },
    );
  }

  getTeamDetails(hackathonUserResponseId): Observable<any> {
    const params = new HttpParams().set('hackathon_user_response_id', hackathonUserResponseId);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_USER_RESPONSE.GET_TEAM_DETAILS), {
      params,
    });
  }

  updateProjectDetails(dataForm, hackathonUserResponseId): Observable<IHackathonUserResponse> {
    const params = new HttpParams().set('hackathon_user_response_id', hackathonUserResponseId);
    return this.http.put<any>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_USER_RESPONSE.UPDATE_PROJECT_DETAILS),
      dataForm,
      { params },
    );
  }

  verifyInvitationTokenHur(inviteCode): Observable<any> {
    const params = new HttpParams().set('invite_code', inviteCode);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_USER_RESPONSE.VERIFY_INVITATION_TOKEN_HUR),
      {
        params,
      },
    );
  }

  updateInvitationTokenHur(inviteCode, inviteStatus): Observable<IHackathonUserResponse> {
    return this.http.put<IHackathonUserResponse>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_USER_RESPONSE.UPDATE_INVITATION_TOKEN_HUR),
      {
        invite_code: inviteCode,
        invite_status: inviteStatus,
      },
    );
  }

  updateHurStatusComplete(hackathonUserResponseId): Observable<boolean> {
    return this.http.put<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_USER_RESPONSE.COMPLETE_HUR_STATUS),
      {
        hackathon_user_response_id: hackathonUserResponseId,
      },
    );
  }

  getDataFormResponses(hackathonUserResponseId): Observable<any> {
    const params = new HttpParams().set('hackathon_user_response_id', hackathonUserResponseId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_USER_RESPONSE.GET_DATA_FORM_RESPONSES),
      { params },
    );
  }
}
