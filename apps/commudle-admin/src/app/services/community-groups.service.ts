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
import { IEvent } from 'apps/shared-models/event.model';
import { IUser } from 'apps/shared-models/user.model';
import { IUsers } from 'apps/shared-models/users.model';

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

  communities(communityGroupId): Observable<IPagination<ICommunities>> {
    const params = new HttpParams().set('community_group_id', communityGroupId);
    return this.http.get<IPagination<ICommunities>>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_GROUPS.COMMUNITIES),
      {
        params,
      },
    );
  }

  events(communityGroupId): Observable<IPagination<IEvent>> {
    const params = new HttpParams().set('community_group_id', communityGroupId);
    return this.http.get<IPagination<IEvent>>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_GROUPS.EVENTS), {
      params,
    });
  }

  members(query, community_group_id, count, page, employer?, employee?, contentCreator?, speaker?): Observable<IUsers> {
    let params = new HttpParams();
    params = params
      .set('community_group_id', community_group_id)
      .set('count', count)
      .set('page', page)
      .set('employer', employer)
      .set('employee', employee)
      .set('content_creator', contentCreator)
      .set('speaker', speaker);
    if (query) {
      params = params.set('query', query);
    }
    return this.http.get<IUsers>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_GROUPS.MEMEBRS_DETAILS), {
      params,
    });
  }

  communityChannels(communityGroupId): Observable<IPagination<ICommunityChannel>> {
    const params = new HttpParams().set('community_group_id', communityGroupId);
    return this.http.get<IPagination<ICommunityChannel>>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_GROUPS.COMMUNITY_CHANNELS),
      {
        params,
      },
    );
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

  pChannels(communityGroupId, limit, after?): Observable<IPagination<ICommunityChannel>> {
    let params = new HttpParams().set('community_group_id', communityGroupId).set('limit', limit);
    if (after) {
      params = params.set('after', after);
    }
    return this.http.get<IPagination<ICommunityChannel>>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_GROUPS.PUBLIC.COMMUNITY_CHANNELS),
      {
        params,
      },
    );
  }

  pEvents(communityGroupId, limit, before?, after?, when?): Observable<IPagination<IEvent>> {
    let params = new HttpParams().set('community_group_id', communityGroupId).set('limit', limit);
    if (when) {
      params = params.set('when', when);
    }
    if (before) {
      params = params.set('before', before);
    }
    if (after) {
      params = params.set('after', after);
    }
    return this.http.get<IPagination<IEvent>>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_GROUPS.PUBLIC.EVENTS),
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
