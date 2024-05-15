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
  EDiscussionType,
  EDbModels,
} from '@commudle/shared-models';
import { BaseApiService } from './base-api.service';
import { API_ROUTES } from './api-routes.constant';

@Injectable({
  providedIn: 'root',
})
export class CommunityChannelsService {
  constructor(private http: HttpClient, private baseApiService: BaseApiService) {}

  showChannelForm(id: number): Observable<ICommunityChannel> {
    const params = new HttpParams().set('community_channel_id', id);
    return this.http.get<ICommunityChannel>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.SHOW), {
      params,
    });
  }

  getUserChannelCommunities(): Observable<ICommunities> {
    return this.http.get<any>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.USER_CHANNEL_COMMUNITIES));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createChannelForum(communityId: number | string, formData: any): Observable<ICommunityChannel> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.post<ICommunityChannel>(
      this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.CREATE),
      formData,
      { params },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateChannelForum(channelId: number | string, formData: any): Observable<ICommunityChannel> {
    const params = new HttpParams().set('community_channel_id', channelId);
    return this.http.put<ICommunityChannel>(
      this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.UPDATE),
      formData,
      { params },
    );
  }

  deleteChannelForum(channelId: number, archive: boolean): Observable<boolean> {
    const params = new HttpParams().set('community_channel_id', channelId).set('archive', archive);
    return this.http.delete<boolean>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.DELETE), { params });
  }

  indexChannelForum(
    communityId: number | string,
    displayType: EDiscussionType,
  ): Observable<IPagination<ICommunityChannel[]>> {
    const params = new HttpParams().set('community_id', communityId).set('display_type', displayType).set('limit', 50);
    return this.http.get<IPagination<ICommunityChannel[]>>(
      this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.INDEX),
      {
        params,
      },
    );
  }

  getJoinToken(channelId: number): Observable<string> {
    const params = new HttpParams().set('community_channel_id', channelId);
    return this.http.get<string>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.JOIN_TOKEN), { params });
  }

  resetJoinToken(channelId: number): Observable<string> {
    return this.http.put<string>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.RESET_JOIN_TOKEN), {
      community_channel_id: channelId,
    });
  }

  joinChannel(channelId: number, token?: string, decline?: boolean): Observable<boolean> {
    const params = {} as any;
    params.community_channel_id = channelId;
    if (token) {
      params.token = token;
    }
    if (decline) {
      params.decline = decline;
    }
    return this.http.put<boolean>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.JOIN_CHANNEL), params);
  }

  getTaggableUsers(query, channelId: number): Observable<IUsers> {
    const params = new HttpParams().set('query', query).set('community_channel_id', channelId);
    return this.http.get<IUsers>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.TAGGABLE_USERS), {
      params,
    });
  }

  deleteChannelForumLogo(channelId: number): Observable<boolean> {
    const params = new HttpParams().set('community_channel_id', channelId);

    return this.http.delete<boolean>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.DELETE_LOGO), {
      params,
    });
  }

  //show community channel by token
  showByToken(token: string): Observable<ICommunityChannel> {
    const params = new HttpParams().set('token', token);
    return this.http.get<ICommunityChannel>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.SHOW_BY_TOKEN), {
      params,
    });
  }

  // MESSAGE
  getPinnedMessages(channelId: number): Observable<IUserMessage[]> {
    const params = new HttpParams().set('community_channel_id', channelId);
    return this.http.get<IUserMessage[]>(
      this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.PINNING_MESSAGES.PINNED_MESSAGES),
      { params },
    );
  }

  unpinMessage(userMessageId: number, channelId: number): Observable<boolean> {
    return this.http.post<boolean>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.PINNING_MESSAGES.UNPIN), {
      community_channel_id: channelId,
      user_message_id: userMessageId,
    });
  }

  pinMessage(userMessageId: number, channelId: number): Observable<boolean> {
    return this.http.post<boolean>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.PINNING_MESSAGES.PIN), {
      community_channel_id: channelId,
      user_message_id: userMessageId,
    });
  }

  sendMessageByEmail(userMessageId: number, channelId: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.SEND_MESSAGE_BY_EMAIL_TO_ALL_MEMBERS),
      {
        community_channel_id: channelId,
        user_message_id: userMessageId,
      },
    );
  }

  // DEPRECATED SOON
  getDiscussionMessages(channelId: number, page: number, count: number): Observable<IUserMessages> {
    const params = new HttpParams().set('community_channel_id', channelId).set('page', page).set('count', count);
    return this.http.get<IUserMessages>(
      this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.DISCUSSION_MESSAGES),
      { params },
    );
  }

  // DEPRECATED SOON
  getDiscussionMessagesForScroll(
    channelId: number,
    count: number,
    action,
    messageId: number,
  ): Observable<IUserMessages> {
    let params;
    if (action === 'initial') {
      params = new HttpParams().set('community_channel_id', channelId).set('count', count);
    } else {
      params = new HttpParams()
        .set('community_channel_id', channelId)
        .set('type', action)
        .set('user_message_id', messageId)
        .set('count', count);
    }
    return this.http.get<IUserMessages>(
      this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.DISCUSSION_MESSAGES_SCROLL),
      { params },
    );
  }

  // MEMBER
  inviteMembers(channelId: number, userRoleData): Observable<IUserRolesUser> {
    const params = new HttpParams().set('community_channel_id', channelId);
    return this.http.post<IUserRolesUser>(
      this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.INVITE),
      {
        user_roles_user: userRoleData,
      },
      { params },
    );
  }

  channelForumMembersIndex(channelId: number, page: number, count: number): Observable<IUserRolesUsers> {
    const params = new HttpParams().set('community_channel_id', channelId).set('page', page).set('count', count);
    return this.http.get<IUserRolesUsers>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.INDEX), {
      params,
    });
  }

  removeMemberFromChannelForum(userRolesUserId: number): Observable<any> {
    const params = new HttpParams().set('user_roles_user_id', userRolesUserId);
    return this.http.delete<any>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.REMOVE), {
      params,
    });
  }

  memberToggleAdmin(userRolesUserId: number): Observable<IUserRolesUser> {
    return this.http.put<IUserRolesUser>(
      this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.TOGGLE_ADMIN),
      {
        user_roles_user_id: userRolesUserId,
      },
    );
  }

  memberJoinByToken(token: string, decline: boolean): Observable<any> {
    return this.http.post<any>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.JOIN_BY_TOKEN), {
      token,
      decline: decline,
    });
  }

  memberExitChannel(channelId: number): Observable<any> {
    const params = new HttpParams().set('community_channel_id', channelId);
    return this.http.delete<any>(this.baseApiService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.MEMBERS.EXIT_CHANNEL), {
      params,
    });
  }
}
