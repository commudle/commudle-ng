import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { IQuestionTypes } from 'projects/shared-models/question_types.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IPoll } from 'projects/shared-models/poll.model';
import { Observable } from 'rxjs';
import { IUsers } from 'projects/shared-models/users.model';
import { IDiscussionFollowers } from 'projects/shared-models/discussion-followers.model';
import { IDiscussionFollower } from 'projects/shared-models/discussion-follower.model';
import { IDiscussion } from 'projects/shared-models/discussion.model';

@Injectable({
  providedIn: 'root'
})
export class SDiscussionsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }

  getPersonalChat(discussionId): Observable<IDiscussion> {
    let params = new HttpParams().set('discussion_id', discussionId);
    return this.http.get<IDiscussion>(
      this.apiRoutesService.getRoute(API_ROUTES.DISCUSSIONS.GET_PERSONAL_CHAT), {params});
  }

  getPersonalChats(): Observable<IDiscussionFollowers> {
    return this.http.get<IDiscussionFollowers>(
      this.apiRoutesService.getRoute(API_ROUTES.DISCUSSIONS.GET_PERSONAL_CHATS));
  }

  getOrCreatePersonalChat(followerIds): Observable<IDiscussionFollower> {
    let params =  new HttpParams({
      fromObject: { 'follower_ids[]': followerIds }
    });
    return this.http.get<IDiscussionFollower>(
      this.apiRoutesService.getRoute(API_ROUTES.DISCUSSIONS.GET_OR_CREATE_PERSONAL_CHAT), {params}
    );
  }

}
