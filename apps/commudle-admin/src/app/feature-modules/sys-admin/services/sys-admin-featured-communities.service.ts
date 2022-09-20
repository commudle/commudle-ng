import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFeaturedCommunities } from '@commudle/shared-models';
import { IFeaturedCommunity } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SysAdminFeaturedCommunitiesService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {
    // do nothing
  }

  getAllFeaturedCommunities(page?: number, count?: number): Observable<IFeaturedCommunities> {
    let params = new HttpParams();

    if (page) {
      params = params.append('page', String(page));
    }
    if (count) {
      params = params.append('count', String(count));
    }

    return this.http.get<IFeaturedCommunities>(this.apiRoutesService.getRoute(API_ROUTES.FEATURED_COMMUNITIES.INDEX), {
      params,
    });
  }

  getFeaturedCommunityById(featuredCommunityId: number): Observable<IFeaturedCommunity> {
    const params = new HttpParams().set('featured_community_id', String(featuredCommunityId));

    return this.http.get<IFeaturedCommunity>(this.apiRoutesService.getRoute(API_ROUTES.FEATURED_COMMUNITIES.SHOW), {
      params,
    });
  }

  createFeaturedCommunity(communityId: number, formData: any): Observable<IFeaturedCommunity> {
    const params = new HttpParams().set('community_id', String(communityId));

    return this.http.post<IFeaturedCommunity>(
      this.apiRoutesService.getRoute(API_ROUTES.FEATURED_COMMUNITIES.CREATE),
      formData,
      { params },
    );
  }

  updateFeaturedCommunity(featuredCommunityId: number, formData: any): Observable<IFeaturedCommunity> {
    const params = new HttpParams().set('featured_community_id', String(featuredCommunityId));

    return this.http.put<IFeaturedCommunity>(
      this.apiRoutesService.getRoute(API_ROUTES.FEATURED_COMMUNITIES.UPDATE),
      formData,
      { params },
    );
  }

  deleteFeaturedCommunity(featuredCommunityId: number): Observable<boolean> {
    const params = new HttpParams().set('featured_community_id', String(featuredCommunityId));

    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.FEATURED_COMMUNITIES.UPDATE), {
      params,
    });
  }
}
