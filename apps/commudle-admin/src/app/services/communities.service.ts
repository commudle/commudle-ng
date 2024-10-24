import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICommunities } from 'apps/shared-models/communities.model';
import { ICommunity } from 'apps/shared-models/community.model';
import { IPagination } from 'apps/shared-models/pagination.model';
import { ISpeakers } from 'apps/shared-models/stats/speaker.model';
import { IUsers } from 'apps/shared-models/users.model';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
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

  pGetCommunityDetails(communityId): Observable<ICommunity> {
    const params = new HttpParams().set('community_id', String(communityId));
    return this.http.get<ICommunity>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.PUBLIC_DETAILS), { params });
  }

  toggleEmailVisibility(communityId): Observable<boolean> {
    return this.http.post<boolean>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.TOGGLE_EMAIL_VISIBILITY), {
      community_id: communityId,
    });
  }

  togglePaymentEnable(communityId): Observable<boolean> {
    return this.http.post<boolean>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.TOGGLE_PAYMENTS), {
      community_id: communityId,
    });
  }

  sendCsvSpeakersList(communityId): Observable<boolean> {
    const params = new HttpParams().set('community_id', String(communityId));
    return this.http.get<boolean>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.CSV_SPEAKERS_LIST), { params });
  }

  getSpeakersList(
    mini?: boolean,
    after?: string,
    limit?: number,
    community_group_id?: number,
    query?: string,
    month?: boolean,
    year?: boolean,
    employer?: boolean,
    employee?: boolean,
    community_id?: any,
  ): Observable<IPagination<ISpeakers>> {
    let params = new HttpParams();
    if (mini) {
      params = params.set('mini', mini);
    }
    if (query) {
      params = params.set('q', query);
    }
    if (after) {
      params = params.set('after', after);
    }
    if (limit) {
      params = params.set('limit', limit);
    }
    if (community_group_id) {
      params = params.set('community_group_id', community_group_id);
    }
    if (month) {
      params = params.set('monthly', month);
    }
    if (year) {
      params = params.set('yearly', year);
    }
    if (employer) {
      params = params.set('employer', employer);
    }
    if (employee) {
      params = params.set('employee', employee);
    }
    if (community_id) {
      params = params.set('community_id', community_id);
    }
    return this.http.get<IPagination<ISpeakers>>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.PUBLIC.SPEAKERS),
      { params },
    );
  }

  getPopularCommunities(
    after?: string,
    limit?: number,
    query?: string,
    order_by?: string,
  ): Observable<IPagination<ICommunity>> {
    let params = new HttpParams();
    if (after) {
      params = params.set('after', after);
    }
    if (limit) {
      params = params.set('limit', limit);
    }
    if (query) {
      params = params.set('query', query);
    }
    if (order_by) {
      params = params.set('order_by', order_by);
    }
    return this.http.get<IPagination<ICommunity>>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.PUBLIC.INDEX), {
      params,
    });
  }
}
