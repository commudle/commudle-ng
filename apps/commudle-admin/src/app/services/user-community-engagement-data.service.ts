import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from '@commudle/shared-services';
import { API_ROUTES } from '@commudle/shared-services';
import { IUserCommunityEngagementData } from '@commudle/shared-models';

@Injectable({
  providedIn: 'root',
})
export class UserCommunityEngagementDataService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getUserCommunityEngagementData(userId, communityId): Observable<IUserCommunityEngagementData> {
    const params = new HttpParams().set('user_id', userId).set('community_id', communityId);
    return this.http.get<IUserCommunityEngagementData>(
      this.apiRoutesService.getRoute(API_ROUTES.GET_USER_COMMUNITY_ENGAGEMENT_DATA),
      { params },
    );
  }
}
