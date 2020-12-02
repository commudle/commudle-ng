import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ICommunityChannels } from 'projects/shared-models/community-channels.model';
import { tokenize } from 'prismjs';


@Injectable({
  providedIn: 'root'
})
export class CommunityChannelsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService,
  ) { }

  create(communityId, channelData): Observable<ICommunityChannel> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.post<ICommunityChannel>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.CREATE), channelData, {params}
    );
  }

  index(communityId): Observable<ICommunityChannels> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<ICommunityChannels>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.INDEX), {params}
    );
  }

  getJoinToken(communityChannelId): Observable<string> {
    const params = new HttpParams().set('community_channel_id', communityChannelId);
    return this.http.get<string>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.JOIN_TOKEN), {params}
    );
  }

  resetJointoken(communityChannelId): Observable<string> {
    const params = new HttpParams().set('community_channel_id', communityChannelId);
    return this.http.put<string>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.RESET_JOIN_TOKEN), {params}
    );
  }


  inviteMember(communityChannelId, userRoleData): Observable<string> {
    const params = new HttpParams().set('community_channel_id', communityChannelId);
    return this.http.post<string>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.INVITE),
      {
        user_roles_user: userRoleData
      },
      {params}
    );
  }

  joinByToken(token, userRoleData): Observable<string> {
    const params = new HttpParams().set('token', token);
    return this.http.post<string>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.JOIN_BY_TOKEN),
      {
        user_roles_user: userRoleData
      },
      {params}
    );
  }

  toggleAdmin(userRolesUserId): Observable<string> {
    const params = new HttpParams().set('user_roles_user_id', userRolesUserId);
    return this.http.put<string>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.TOGGLE_ADMIN),
      {params}
    );
  }


  removeMembership(userRolesUserId): Observable<string> {
    const params = new HttpParams().set('user_roles_user_id', userRolesUserId);
    return this.http.delete<string>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.REMOVE),
      {params}
    );
  }
}
