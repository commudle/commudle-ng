import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICommunityBuild } from '@commudle/shared-models';
import { ICommunity } from '@commudle/shared-models';
import { ILab } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getRecommendedLabs(): Observable<ILab[]> {
    return this.http.get<ILab[]>(this.apiRoutesService.getRoute(API_ROUTES.RECOMMENDATIONS.LABS));
  }

  getRecommendedCommunityBuilds(): Observable<ICommunityBuild[]> {
    return this.http.get<ICommunityBuild[]>(
      this.apiRoutesService.getRoute(API_ROUTES.RECOMMENDATIONS.COMMUNITY_BUILDS),
    );
  }

  getRecommendedCommunities(): Observable<ICommunity[]> {
    return this.http.get<ICommunity[]>(this.apiRoutesService.getRoute(API_ROUTES.RECOMMENDATIONS.COMMUNITIES));
  }
}
