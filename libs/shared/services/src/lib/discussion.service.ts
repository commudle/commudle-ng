import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination, IUserMessage } from '@commudle/shared-models';
import { Observable } from 'rxjs';
import { API_ROUTES } from './api-routes.constant';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class DiscussionService {
  constructor(private http: HttpClient, private baseApiService: BaseApiService) {}

  getCommunityBuildMessages(
    discussionId: number,
    {
      limit,
      after,
      before,
      first,
      last,
    }: { limit?: number; after?: string; before?: string; first?: number; last?: number },
    fromLastRead?: boolean,
  ): Observable<IPagination<IUserMessage>> {
    return this.http.get<IPagination<IUserMessage>>(
      this.baseApiService.getRoute(API_ROUTES.DISCUSSIONS.PUBLIC_COMMUNITY_BUILD_MESSAGES),
      {
        params: {
          discussion_id: discussionId.toString(),
          ...(limit && { limit: limit.toString() }),
          ...(after && { after }),
          ...(before && { before }),
          ...(first && { first: first.toString() }),
          ...(last && { last: last.toString() }),
          ...(fromLastRead && { from_last_read: fromLastRead.toString() }),
        },
      },
    );
  }

  toggleDiscussionOpen(discussionId: number): Observable<boolean> {
    return this.http.put<boolean>(this.baseApiService.getRoute(API_ROUTES.DISCUSSIONS.TOGGLE_DISCUSSION_OPEN), {
      discussion_id: discussionId,
    });
  }
}
