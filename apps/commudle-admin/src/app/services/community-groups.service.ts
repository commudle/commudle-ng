import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { ICommunities } from 'apps/shared-models/communities.model';
import { ICommunityGroups } from 'apps/shared-models/community-groups.model';
import { IPagination } from 'apps/shared-models/pagination.model';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';

@Injectable({
  providedIn: 'root',
})
export class CommunityGroupsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  create(communityGroupData): Observable<ICommunityGroup> {
    return this.http.post<ICommunityGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_GROUPS.CREATE),
      communityGroupData,
    );
  }

  update(communityGroupId, communityGroupData): Observable<ICommunityGroup> {
    const params = new HttpParams().set('community_group_id', communityGroupId);
    return this.http.put<ICommunityGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_GROUPS.UPDATE),
      communityGroupData,
      { params },
    );
  }

  show(communityGroupId): Observable<ICommunityGroup> {
    const params = new HttpParams().set('community_group_id', communityGroupId);
    return this.http.get<ICommunityGroup>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_GROUPS.SHOW), { params });
  }

  getManagingCommunityGroups(): Observable<ICommunityGroups> {
    return this.http.get<ICommunityGroups>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_GROUPS.MANAGING_COMMUNITY_GROUPS),
    );
  }

  communities(communityGroupId): Observable<ICommunities> {
    const params = new HttpParams().set('community_group_id', communityGroupId);
    return this.http.get<ICommunities>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_GROUPS.COMMUNITIES), {
      params,
    });
  }

  pShow(communityGroupId): Observable<ICommunityGroup> {
    const params = new HttpParams().set('community_group_id', communityGroupId);
    return this.http.get<ICommunityGroup>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_GROUPS.PUBLIC.SHOW), {
      params,
    });
  }

  pCommunities(communityGroupId): Observable<ICommunities> {
    const params = new HttpParams().set('community_group_id', communityGroupId);
    return this.http.get<ICommunities>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_GROUPS.PUBLIC.COMMUNITIES), {
      params,
    });
  }

  pChannels(communityGroupId): Observable<IPagination<ICommunityChannel>> {
    const params = new HttpParams().set('community_group_id', communityGroupId);
    return this.http.get<IPagination<ICommunityChannel>>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_GROUPS.PUBLIC.COMMUNITY_CHANNELS),
      {
        params,
      },
    );
  }

  activeCommunityAndChannels(communityGroupId): Observable<any> {
    const params = new HttpParams().set('community_group_id', communityGroupId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_GROUPS.PUBLIC.ACTIVE_COMMUNITIES_AND_CHANNELS),
      {
        params,
      },
    );
  }
}
