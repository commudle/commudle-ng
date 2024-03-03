import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';
import { IHackathon } from 'apps/shared-models/hackathon.model';
import { IHackathonSponsor } from 'apps/shared-models/hackathon-sponsor';
import { IContactInfo } from 'apps/shared-models/contact-info.model';
import { IHackathonTrack } from 'apps/shared-models/hackathon-track.model';
import { IHackathonPrize } from 'apps/shared-models/hackathon-prize.model';
import { IHackathonJudge } from 'apps/shared-models/hackathon-judge.model';
import { IHackathonUserResponses } from 'apps/shared-models/hackathon-user-responses.model';
import { IHackathonTeam } from 'apps/shared-models/hackathon-team.model';
import { ICommunityBuild } from '@commudle/shared-models';

@Injectable({
  providedIn: 'root',
})
export class HackathonService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  createHackathon(dataForm, parentId, parentType): Observable<IHackathon> {
    let params = new HttpParams();
    switch (parentType) {
      case 'Kommunity': {
        params = params.set('community_id', parentId);
        break;
      }
      case 'CommunityGroup': {
        params = params.set('community_group_id', parentId);
        break;
      }
    }
    return this.http.post<IHackathon>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.CREATE), dataForm, {
      params,
    });
  }

  updateHackathon(dataForm, hackathonId): Observable<IHackathon> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.put<IHackathon>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.UPDATE), dataForm, {
      params,
    });
  }

  indexHackathons(parentId, parentType: string): Observable<IHackathon[]> {
    let params = new HttpParams();
    switch (parentType) {
      case 'Kommunity': {
        params = params.set('community_id', parentId);
        break;
      }
      case 'CommunityGroup': {
        params = params.set('community_group_id', parentId);
        break;
      }
    }
    return this.http.get<IHackathon[]>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.INDEX), { params });
  }

  pIndexHackathons(parentId, parentType: string): Observable<IHackathon[]> {
    let params = new HttpParams();
    switch (parentType) {
      case 'Kommunity': {
        params = params.set('community_id', parentId);
        break;
      }
      case 'CommunityGroup': {
        params = params.set('community_group_id', parentId);
        break;
      }
    }
    return this.http.get<IHackathon[]>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.PUBLIC.INDEX), { params });
  }

  showHackathon(hackathonId): Observable<IHackathon> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.get<IHackathon>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.SHOW), { params });
  }

  createHackathonContactInfo(formData, hackathonId): Observable<IContactInfo> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.post<IContactInfo>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.CREATE_CONTACT_INFO),
      {
        contact_info: formData,
      },
      { params },
    );
  }

  updateHackathonContactInfo(formData, hackathonId): Observable<IContactInfo> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.put<IContactInfo>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.UPDATE_CONTACT_INFO),
      {
        contact_info: formData,
      },
      { params },
    );
  }

  showHackathonContactInfo(hackathonId): Observable<IContactInfo> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.get<IContactInfo>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.SHOW_CONTACT_INFO), {
      params,
    });
  }

  updateHackathonDates(dataForm, hackathonId): Observable<IHackathon> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.put<IHackathon>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.UPDATE_HACKATHON_DATE),
      {
        hackathon: dataForm,
      },
      { params },
    );
  }

  createSponsor(sponsor, hackathonId): Observable<IHackathonSponsor> {
    sponsor.append('hackathon_id', hackathonId);
    return this.http.post<IHackathonSponsor>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.CREATE_SPONSOR),
      sponsor,
    );
  }

  indexSponsors(hackathonId): Observable<IHackathonSponsor[]> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.get<IHackathonSponsor[]>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.INDEX_SPONSORS), {
      params,
    });
  }

  destroySponsor(sponsorId): Observable<boolean> {
    const params = new HttpParams().set('hackathon_sponsor_id', sponsorId);
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.DESTROY_SPONSOR), { params });
  }

  createTrack(formData, hackathonId): Observable<IHackathonTrack> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.post<IHackathonTrack>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.CREATE_TRACK),
      {
        hackathon_track: formData,
      },
      { params },
    );
  }

  updateTrack(formData, trackId): Observable<IHackathonTrack> {
    const params = new HttpParams().set('track_id', trackId);
    return this.http.put<IHackathonTrack>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.UPDATE_TRACK),
      {
        hackathon_track: formData,
      },
      { params },
    );
  }

  indexTracks(hackathonId): Observable<IHackathonTrack[]> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.get<IHackathonTrack[]>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.INDEX_TRACKS), {
      params,
    });
  }

  destroyTrack(trackId): Observable<boolean> {
    const params = new HttpParams().set('track_id', trackId);
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.DESTROY_TRACK), { params });
  }

  createPrize(formData): Observable<IHackathonPrize> {
    return this.http.post<IHackathonPrize>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.CREATE_PRIZE), {
      hackathon_track_prize: formData,
    });
  }

  updatePrize(formData, prizeId): Observable<IHackathonPrize> {
    const params = new HttpParams().set('prize_id', prizeId);
    return this.http.put<IHackathonPrize>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.UPDATE_PRIZE),
      {
        hackathon_track_prize: formData,
      },
      { params },
    );
  }

  destroyPrize(prizeId): Observable<boolean> {
    const params = new HttpParams().set('prize_id', prizeId);
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.DESTROY_PRIZE), { params });
  }

  getPrizesByTrack(hackathonTrackId): Observable<IHackathonPrize[]> {
    const params = new HttpParams().set('hackathon_track_id', hackathonTrackId);
    return this.http.get<IHackathonPrize[]>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.INDEX_TRACK_PRIZE), {
      params,
    });
  }

  getPrizesByHackathon(hackathonId): Observable<IHackathonPrize[]> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.get<IHackathonPrize[]>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.INDEX_HACKATHON_PRIZES),
      {
        params,
      },
    );
  }

  createJudge(formData, hackathonId): Observable<IHackathonJudge> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.post<IHackathonJudge>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.CREATE_JUDGE),
      formData,
      { params },
    );
  }

  updateJudge(formData, judgeId): Observable<IHackathonJudge> {
    const params = new HttpParams().set('hackathon_judge_id', judgeId);
    return this.http.put<IHackathonJudge>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.UPDATE_JUDGE),
      formData,
      { params },
    );
  }

  destroyJudge(judgeId): Observable<boolean> {
    const params = new HttpParams().set('hackathon_judge_id', judgeId);
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.DESTROY_JUDGE), { params });
  }

  indexJudge(hackathonId): Observable<IHackathonJudge[]> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.get<IHackathonJudge[]>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.INDEX_JUDGES), {
      params,
    });
  }

  indexUserResponses(hackathonId): Observable<IHackathonUserResponses[]> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.get<IHackathonUserResponses[]>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.INDEX_USER_RESPONSES),
      {
        params,
      },
    );
  }

  showUserResponsesByTeam(teamId): Observable<IHackathonUserResponses> {
    const params = new HttpParams().set('team_id', teamId);
    return this.http.get<IHackathonUserResponses>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.SHOW_USER_RESPONSES_BY_TEAM),
      {
        params,
      },
    );
  }

  changeTeamStatus(teamId, registrationStatus): Observable<IHackathonTeam> {
    return this.http.put<IHackathonTeam>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.CHANGE_TEAM_REGISTRATION_STATUS),
      {
        team_id: teamId,
        registration_status: registrationStatus,
      },
    );
  }
  changeTeamRound(teamId, roundId): Observable<IHackathonTeam> {
    return this.http.put<IHackathonTeam>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.CHANGE_TEAM_ROUND_STATUS),
      {
        team_id: teamId,
        round_id: roundId,
      },
    );
  }

  getHackathonCurrentRegistrationDetails(): Observable<IHackathonTeam> {
    return this.http.get<IHackathonTeam>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.GET_HACKATHON_CURRENT_REGISTRATION_DETAILS),
    );
  }

  updateHackathonStatus(hackathonId, status): Observable<boolean> {
    return this.http.put<boolean>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.UPDATE_STATUS), {
      hackathon_id: hackathonId,
      hackathon_status: status,
    });
  }

  verifyInvitationTokenJudge(inviteCode): Observable<any> {
    const params = new HttpParams().set('invite_code', inviteCode);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.VERIFY_INVITATION_TOKEN_JUDGE), {
      params,
    });
  }

  updateInvitationTokenJudge(inviteCode, inviteStatus): Observable<IHackathonJudge> {
    return this.http.put<IHackathonJudge>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.UPDATE_INVITATION_TOKEN_JUDGE),
      {
        invite_code: inviteCode,
        invite_status: inviteStatus,
      },
    );
  }

  // PUBLIC APIS

  pIndexHackathonTracks(hackathonId): Observable<IHackathonTrack[]> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.get<IHackathonTrack[]>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.PUBLIC.INDEX_TRACKS), {
      params,
    });
  }

  pIndexPrizes(hackathonId): Observable<IHackathonPrize[]> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.get<IHackathonPrize[]>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.PUBLIC.INDEX_PRIZES), {
      params,
    });
  }

  pIndexJudge(hackathonId): Observable<IHackathonJudge[]> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.get<IHackathonJudge[]>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.PUBLIC.INDEX_JUDGES), {
      params,
    });
  }

  pIndexSponsors(hackathonId): Observable<IHackathonSponsor[]> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.get<IHackathonSponsor[]>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.PUBLIC.INDEX_SPONSORS),
      {
        params,
      },
    );
  }

  pIndexProjects(hackathonId): Observable<ICommunityBuild[]> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.get<ICommunityBuild[]>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.PUBLIC.INDEX_PROJECTS),
      {
        params,
      },
    );
  }
}
