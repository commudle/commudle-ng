/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IUserRolesUser } from './../../../../../../shared-models/user_roles_user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ICommunityChannels } from 'projects/shared-models/community-channels.model';
import { IUserRolesUsers } from 'projects/shared-models/user_roles_users.model';
import { IUsers } from 'projects/shared-models/users.model';
import { ICommunities } from 'projects/shared-models/communities.model';

@Injectable({
  providedIn: 'root'
})
export class CommunityChannelsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getChannelInfo(id): Observable<ICommunityChannel> {
    const params = new HttpParams().set('community_channel_id', id);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.SHOW), { params });
  }

  getUserChannelCommunities(): Observable<ICommunities> {
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.USER_CHANNEL_COMMUNITIES));
  }

  create(communityId, channelData): Observable<ICommunityChannel> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.post<ICommunityChannel>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.CREATE), channelData, {params}
    );
  }

  update(communityChannelId, channelData): Observable<ICommunityChannel> {
    const params = new HttpParams().set('community_channel_id', communityChannelId);
    return this.http.put<ICommunityChannel>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.UPDATE), channelData, {params}
    );
  }

  delete(communityChannelId): Observable<boolean> {
    const params = new HttpParams().set('community_channel_id', communityChannelId);

    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.DELETE), { params });
  }

  index(communityId): Observable<ICommunityChannels> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<ICommunityChannels>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.INDEX),
      params,
    );
  }

  getJoinToken(communityChannelId): Observable<string> {
    const params = new HttpParams().set('community_channel_id', communityChannelId);
    return this.http.get<string>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.JOIN_TOKEN), { params });
  }

  resetJointoken(communityChannelId): Observable<string> {
    return this.http.put<string>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.RESET_JOIN_TOKEN), {
      community_channel_id: communityChannelId,
    });
  }

  inviteMembers(communityChannelId, userRoleData): Observable<IUserRolesUser> {
    const params = new HttpParams().set('community_channel_id', communityChannelId);
    return this.http.post<IUserRolesUser>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.INVITE),
      {
        user_roles_user: userRoleData,
      },
      { params },
    );
  }

  joinChannel(communityChannelId: number, token?: string): Observable<boolean> {
    let params = {};
    params.community_channel_id = communityChannelId;
    if (token) {
      params.token = token;
    }
    return this.http.put<boolean>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.JOIN_CHANNEL), params);
  }

  joinByToken(token): Observable<boolean> {
    return this.http.post<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.JOIN_BY_TOKEN),
      { token },
    );
  }


  membersList(communityChannelId, page, count): Observable<IUserRolesUsers> {
    const params = new HttpParams().set('community_channel_id', communityChannelId).set('page', page).set('count', count);
    return this.http.get<IUserRolesUsers>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.INDEX),
      {params}
    );
  }


  toggleAdmin(userRolesUserId): Observable<IUserRolesUser> {
    return this.http.put<IUserRolesUser>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.TOGGLE_ADMIN),
      {
        user_roles_user_id: userRolesUserId
      }
    );
  }


  removeMembership(userRolesUserId): Observable<any> {
    const params = new HttpParams().set('user_roles_user_id', userRolesUserId);
    return this.http.delete<any>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.REMOVE),
      {params}
    );
  }


  exitChannel(channelId): Observable<any> {
    const params = new HttpParams().set('community_channel_id', channelId);
    return this.http.delete<any>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.EXIT_CHANNEL),
      {params}
    );
  }


  getTaggableUsers(query, channelId):  Observable<IUsers> {
    const params = new HttpParams().set('query', query).set('community_channel_id', channelId);
    return this.http.get<IUsers>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.TAGGABLE_USERS),
      {params}
    );
  }


  deleteLogo(communityChannelId): Observable<boolean> {
    const params = new HttpParams().set('community_channel_id', communityChannelId);

    return this.http.delete<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.DELETE_LOGO),
      {params}
    );
  }
}
