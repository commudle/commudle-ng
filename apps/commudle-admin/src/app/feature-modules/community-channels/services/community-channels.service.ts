import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ICommunities,
  ICommunityChannel,
  ICommunityChannels,
  IUserMessage,
  IUserMessages,
  IUserRolesUser,
  IUserRolesUsers,
  IUsers,
} from '@commudle/shared-models';
import { API_ROUTES, ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
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
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.CREATE),
      channelData,
      { params },
    );
  }

  update(communityChannelId, channelData): Observable<ICommunityChannel> {
    const params = new HttpParams().set('community_channel_id', communityChannelId);
    return this.http.put<ICommunityChannel>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.UPDATE),
      channelData,
      { params },
    );
  }

  delete(communityChannelId): Observable<boolean> {
    const params = new HttpParams().set('community_channel_id', communityChannelId);

    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.DELETE), { params });
  }

  index(communityId): Observable<ICommunityChannels> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<ICommunityChannels>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.INDEX), {
      params,
    });
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
    const params = {} as any;
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
    const params = new HttpParams()
      .set('community_channel_id', communityChannelId)
      .set('page', page)
      .set('count', count);
    return this.http.get<IUserRolesUsers>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.INDEX), {
      params,
    });
  }

  toggleAdmin(userRolesUserId): Observable<IUserRolesUser> {
    return this.http.put<IUserRolesUser>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.TOGGLE_ADMIN),
      {
        user_roles_user_id: userRolesUserId,
      },
    );
  }

  removeMembership(userRolesUserId): Observable<any> {
    const params = new HttpParams().set('user_roles_user_id', userRolesUserId);
    return this.http.delete<any>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.REMOVE), {
      params,
    });
  }

  exitChannel(channelId): Observable<any> {
    const params = new HttpParams().set('community_channel_id', channelId);
    return this.http.delete<any>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.EXIT_CHANNEL), {
      params,
    });
  }

  getTaggableUsers(query, channelId): Observable<IUsers> {
    const params = new HttpParams().set('query', query).set('community_channel_id', channelId);
    return this.http.get<IUsers>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.TAGGABLE_USERS), {
      params,
    });
  }

  deleteLogo(communityChannelId): Observable<boolean> {
    const params = new HttpParams().set('community_channel_id', communityChannelId);

    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.DELETE_LOGO), {
      params,
    });
  }

  getDiscussionMessages(communityChannelId, page, count): Observable<IUserMessages> {
    const params = new HttpParams()
      .set('community_channel_id', communityChannelId)
      .set('page', page)
      .set('count', count);
    return this.http.get<IUserMessages>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.DISCUSSION_MESSAGES),
      { params },
    );
  }

  getDiscussionMessagesForScroll(communityChannelId, count, action, messageId): Observable<IUserMessages> {
    let params;
    if (action === 'initial') {
      params = new HttpParams().set('community_channel_id', communityChannelId).set('count', count);
    } else {
      params = new HttpParams()
        .set('community_channel_id', communityChannelId)
        .set('type', action)
        .set('user_message_id', messageId)
        .set('count', count);
    }
    return this.http.get<IUserMessages>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.DISCUSSION_MESSAGES_SCROLL),
      { params },
    );
  }

  sendMessageByEmail(userMessageId, communityChannelId): Observable<boolean> {
    return this.http.post<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.SEND_MESSAGE_BY_EMAIL_TO_ALL_MEMBERS),
      {
        community_channel_id: communityChannelId,
        user_message_id: userMessageId,
      },
    );
  }

  pinMessage(userMessageId, communityChannelId): Observable<boolean> {
    return this.http.post<boolean>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.PINNING_MESSAGES.PIN), {
      community_channel_id: communityChannelId,
      user_message_id: userMessageId,
    });
  }

  unpinMessage(userMessageId, communityChannelId): Observable<boolean> {
    return this.http.post<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.PINNING_MESSAGES.UNPIN),
      {
        community_channel_id: communityChannelId,
        user_message_id: userMessageId,
      },
    );
  }

  getPinnedMessages(communityChannelId): Observable<IUserMessage[]> {
    const params = new HttpParams().set('community_channel_id', communityChannelId);
    return this.http.get<IUserMessage[]>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.PINNING_MESSAGES.PINNED_MESSAGES),
      { params },
    );
  }
}
