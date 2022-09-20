import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserMessages } from '@commudle/shared-models';
import { Observable } from 'rxjs';
import { API_ROUTES } from './api-routes.constants';
import { ApiRoutesService } from './api-routes.service';

@Injectable({
  providedIn: 'root',
})
export class UserMessagesService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getPersonalChatDiscussionMessages(discussionId, page, count): Observable<IUserMessages> {
    const params = new HttpParams().set('discussion_id', discussionId).set('page', page).set('count', count);
    return this.http.get<IUserMessages>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_MESSAGES.PERSONAL_CHAT_DISCUSSION_MESSAGES),
      { params },
    );
  }

  getTrackSlotDiscussionQuestions(discussionId, page, count): Observable<IUserMessages> {
    const params = new HttpParams().set('discussion_id', discussionId).set('page', page).set('count', count);
    return this.http.get<IUserMessages>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_MESSAGES.PUBLIC_TRACK_SLOT_DISCUSSION_MESSAGES),
      { params },
    );
  }

  pGetDiscussionChatMessages(discussionId, page, count): Observable<IUserMessages> {
    const params = new HttpParams().set('discussion_id', discussionId).set('page', page).set('count', count);
    return this.http.get<IUserMessages>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_MESSAGES.PUBLIC_DISCUSSION_CHAT_MESSAGES),
      { params },
    );
  }

  pGetCommunityChannelDiscussionMessages(discussionId, page, count): Observable<IUserMessages> {
    const params = new HttpParams().set('discussion_id', discussionId).set('page', page).set('count', count);
    return this.http.get<IUserMessages>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_MESSAGES.PUBLIC_COMMUNITY_CHANNEL_DISCUSSION_MESSAGES),
      { params },
    );
  }
}
