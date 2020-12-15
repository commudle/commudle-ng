import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import { IUserMessages } from 'projects/shared-models/user_messages.model';
import { IUserMessage } from 'projects/shared-models/user_message.model';

@Injectable({
  providedIn: 'root'
})
export class UserMessagesService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }



  getPersonalChatDiscussionMessages(discussionId, page, count): Observable<IUserMessages> {
    const params = new HttpParams().set('discussion_id', discussionId).set('page', page).set('count', count);
    return this.http.get<IUserMessages>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_MESSAGES.PERSONAL_CHAT_DISCUSSION_MESSAGES), {params}
    );
  }


  getTrackSlotDiscussionQuestions(discussionId, page, count): Observable<IUserMessages> {
    const params = new HttpParams().set('discussion_id', discussionId).set('page', page).set('count', count);
    return this.http.get<IUserMessages>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_MESSAGES.PUBLIC_TRACK_SLOT_DISCUSSION_MESSAGES), {params}
    );
  }

  pGetDiscussionChatMessages(discussionId, page, count): Observable<IUserMessages> {
    const params = new HttpParams().set('discussion_id', discussionId).set('page', page).set('count', count);
    return this.http.get<IUserMessages>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_MESSAGES.PUBLIC_DISCUSSION_CHAT_MESSAGES), {params}
    );
  }

  pGetCommunityChannelDiscussionMessages(discussionId, page, count): Observable<IUserMessages> {
    const params = new HttpParams().set('discussion_id', discussionId).set('page', page).set('count', count);
    return this.http.get<IUserMessages>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_MESSAGES.PUBLIC_COMMUNITY_CHANNEL_DISCUSSION_MESSAGES), {params}
    );
  }

}
