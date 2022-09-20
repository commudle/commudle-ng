import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from '@commudle/shared-services';
import { IQuestionTypes } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { IPoll } from '@commudle/shared-models';
import { Observable } from 'rxjs';
import { IUsers } from '@commudle/shared-models';
import { IDiscussionFollowers } from '@commudle/shared-models';
import { IDiscussionFollower } from '@commudle/shared-models';
import { IDiscussion } from '@commudle/shared-models';

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
