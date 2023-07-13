/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ICommunityChannel,
  IUserRolesUser,
  IUserRolesUsers,
  ICommunities,
  IPagination,
  IUserMessage,
  IUserMessages,
  IUsers,
} from '@commudle/shared-models';
import { BaseApiService } from '@commudle/shared-services';
import { API_ROUTES } from './api-routes.constant';

@Injectable({
  providedIn: 'root',
})
export class CommunityChannelsService {
  constructor(private http: HttpClient, private baseApiService: BaseApiService) {}

  getChannelInfo(id): Observable<ICommunityChannel> {
    const params = new HttpParams().set('community_channel_id', id);
    return this.http.get<any>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.SHOW), { params });
  }

  getUserChannelCommunities(): Observable<ICommunities> {
    return this.http.get<any>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.USER_CHANNEL_COMMUNITIES));
  }

  create(communityId, channelData): Observable<ICommunityChannel> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.post<ICommunityChannel>(
      this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.CREATE),
      channelData,
      { params },
    );
  }

  update(communityChannelId, channelData): Observable<ICommunityChannel> {
    const params = new HttpParams().set('community_channel_id', communityChannelId);
    return this.http.put<ICommunityChannel>(
      this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.UPDATE),
      channelData,
      { params },
    );
  }

  delete(communityChannelId, archive): Observable<boolean> {
    const params = new HttpParams().set('community_channel_id', communityChannelId).set('archive', archive);

    return this.http.delete<boolean>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.DELETE), { params });
  }

  index(communityId, displayType): Observable<IPagination<ICommunityChannel[]>> {
    const params = new HttpParams().set('community_id', communityId).set('display_type', displayType).set('limit', 50);
    return this.http.get<IPagination<ICommunityChannel[]>>(
      this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.INDEX),
      {
        params,
      },
    );
  }

  getJoinToken(communityChannelId): Observable<string> {
    const params = new HttpParams().set('community_channel_id', communityChannelId);
    return this.http.get<string>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.JOIN_TOKEN), { params });
  }

  resetJointoken(communityChannelId): Observable<string> {
    return this.http.put<string>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.RESET_JOIN_TOKEN), {
      community_channel_id: communityChannelId,
    });
  }

  inviteMembers(communityChannelId, userRoleData): Observable<IUserRolesUser> {
    const params = new HttpParams().set('community_channel_id', communityChannelId);
    return this.http.post<IUserRolesUser>(
      this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.INVITE),
      {
        user_roles_user: userRoleData,
      },
      { params },
    );
  }

  joinChannel(communityChannelId: number, token?: string, decline?: boolean): Observable<boolean> {
    const params = {} as any;
    params.community_channel_id = communityChannelId;
    if (token) {
      params.token = token;
    }
    if (decline) {
      params.decline = decline;
    }
    return this.http.put<boolean>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.JOIN_CHANNEL), params);
  }

  joinByToken(token, decline): Observable<any> {
    return this.http.post<any>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.JOIN_BY_TOKEN), {
      token,
      decline: decline,
    });
  }

  membersList(communityChannelId, page, count): Observable<IUserRolesUsers> {
    const params = new HttpParams()
      .set('community_channel_id', communityChannelId)
      .set('page', page)
      .set('count', count);
    return this.http.get<IUserRolesUsers>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.INDEX), {
      params,
    });
  }

  toggleAdmin(userRolesUserId): Observable<IUserRolesUser> {
    return this.http.put<IUserRolesUser>(
      this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.TOGGLE_ADMIN),
      {
        user_roles_user_id: userRolesUserId,
      },
    );
  }

  removeMembership(userRolesUserId): Observable<any> {
    const params = new HttpParams().set('user_roles_user_id', userRolesUserId);
    return this.http.delete<any>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.REMOVE), {
      params,
    });
  }

  exitChannel(channelId): Observable<any> {
    const params = new HttpParams().set('community_channel_id', channelId);
    return this.http.delete<any>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.EXIT_CHANNEL), {
      params,
    });
  }

  getTaggableUsers(query, channelId): Observable<IUsers> {
    const params = new HttpParams().set('query', query).set('community_channel_id', channelId);
    return this.http.get<IUsers>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.TAGGABLE_USERS), {
      params,
    });
  }

  deleteLogo(communityChannelId): Observable<boolean> {
    const params = new HttpParams().set('community_channel_id', communityChannelId);

    return this.http.delete<boolean>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.DELETE_LOGO), {
      params,
    });
  }

  getDiscussionMessages(communityChannelId, page, count): Observable<IUserMessages> {
    const params = new HttpParams()
      .set('community_channel_id', communityChannelId)
      .set('page', page)
      .set('count', count);
    return this.http.get<IUserMessages>(
      this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.DISCUSSION_MESSAGES),
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
      this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.DISCUSSION_MESSAGES_SCROLL),
      { params },
    );
  }

  sendMessageByEmail(userMessageId, communityChannelId): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.SEND_MESSAGE_BY_EMAIL_TO_ALL_MEMBERS),
      {
        community_channel_id: communityChannelId,
        user_message_id: userMessageId,
      },
    );
  }

  pinMessage(userMessageId, communityChannelId): Observable<boolean> {
    return this.http.post<boolean>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.PINNING_MESSAGES.PIN), {
      community_channel_id: communityChannelId,
      user_message_id: userMessageId,
    });
  }

  unpinMessage(userMessageId, communityChannelId): Observable<boolean> {
    return this.http.post<boolean>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.PINNING_MESSAGES.UNPIN), {
      community_channel_id: communityChannelId,
      user_message_id: userMessageId,
    });
  }

  getPinnedMessages(communityChannelId): Observable<IUserMessage[]> {
    const params = new HttpParams().set('community_channel_id', communityChannelId);
    return this.http.get<IUserMessage[]>(
      this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.PINNING_MESSAGES.PINNED_MESSAGES),
      { params },
    );
  }

  showByToken(token): Observable<any> {
    const params = new HttpParams().set('token', token);
    return this.http.get<any>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.SHOW_BY_TOKEN), {
      params,
    });
  }
}
