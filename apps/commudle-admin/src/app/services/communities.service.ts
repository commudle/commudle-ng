import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICommunities } from '@commudle/shared-models';
import { ICommunity } from '@commudle/shared-models';
import { IUsers } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from '@commudle/shared-services';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunitiesService {
  private userManagedCommunities = new BehaviorSubject<ICommunity[]>([]);
  public userManagedCommunities$: Observable<ICommunity[]> = this.userManagedCommunities.asObservable();

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
    return this.http
      .get<ICommunities>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.USER_ROLE_COMMUNITIES), {
        params,
      })
      .pipe(
        tap((data: ICommunities) => {
          this.userManagedCommunities.next([...this.userManagedCommunities.getValue(), ...data.communities]);
        }),
      );
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
