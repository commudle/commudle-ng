import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICommunities } from 'projects/shared-models/communities.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { IUsers } from 'projects/shared-models/users.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunitiesService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  create(communityData: any, communityGroupId = null): Observable<ICommunity> {
    let params;
    if (communityGroupId) {
      params = new HttpParams().set('community_group_id', communityGroupId);
    }
    return this.http.post<ICommunity>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.CREATE),
      { community: communityData },
      { params },
    );
  }

  getRoleCommunities(role: string): Observable<ICommunities> {
    const params = new HttpParams().set('role', role);
    return this.http.get<ICommunities>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.USER_ROLE_COMMUNITIES), {
      params,
    });
    // .pipe(
    //   tap((data: ICommunities) => {
    //     this.organizerCommunities.next(data.communities);
    //   })
    // );
  }

  // get the details of a community
  getCommunityDetails(communityId: number): Observable<ICommunity> {
    const params = new HttpParams().set('community_id', String(communityId));
    return this.http.get<ICommunity>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.DETAILS), { params });
  }

  // update community details
  updateCommunity(communityFormData: any, communityId: number): Observable<ICommunity> {
    const params = new HttpParams().set('community_id', String(communityId));
    return this.http.put<ICommunity>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.UPDATE), communityFormData, {
      params,
    });
  }

  // search a community by name
  searchByName(query: string): Observable<ICommunity[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<ICommunity[]>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.SEARCH_BY_NAME), {
      params,
    });
  }

  search(query: string, tag: string, page: number, count: number): Observable<ICommunities> {
    const params = new HttpParams()
      .set('query', query)
      .set('tag', tag)
      .set('page', String(page))
      .set('count', String(count));
    return this.http.get<ICommunities>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.SEARCH), { params });
  }

  getPopularTags(): Observable<string[]> {
    return this.http.get<string[]>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.POPULAR_TAGS));
  }

  // get all the speakers
  speakers(communityId: number): Observable<IUsers> {
    const params = new HttpParams().set('community_id', String(communityId));
    return this.http.get<IUsers>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.SPEAKERS), { params });
  }

  // TODO deprecate once we have the new API's for list of communities
  // Public api communication
  pGetCommunities(page: number, count: number, query: string): Observable<ICommunities> {
    const params = new HttpParams().set('page', String(page)).set('count', String(count)).set('query', query);
    return this.http.get<ICommunities>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.PUBLIC_INDEX), { params });
  }

  pGetCommunityDetails(communityId: number): Observable<ICommunity> {
    const params = new HttpParams().set('community_id', String(communityId));
    return this.http.get<ICommunity>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.PUBLIC_DETAILS), { params });
  }
}
