import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICommunityBuild } from 'apps/shared-models/community-build.model';
import { ICommunityBuilds } from 'apps/shared-models/community-builds.model';
import { IPagination } from 'apps/shared-models/pagination.model';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunityBuildsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getAll(page?, count?): Observable<ICommunityBuilds> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }

    if (count) {
      params = params.append('count', count);
    }
    return this.http.get<ICommunityBuilds>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.INDEX), {
      params,
    });
  }

  show(communityBuildId): Observable<ICommunityBuild> {
    const params = new HttpParams().set('community_build_id', communityBuildId);
    return this.http.get<ICommunityBuild>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.SHOW), { params });
  }

  create(commmunityBuild): Observable<ICommunityBuild> {
    return this.http.post<ICommunityBuild>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.CREATE),
      commmunityBuild,
    );
  }

  update(communityBuildId, commmunityBuild): Observable<ICommunityBuild> {
    const params = new HttpParams().set('community_build_id', communityBuildId);
    return this.http.put<ICommunityBuild>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.UPDATE),
      commmunityBuild,
      {
        params,
      },
    );
  }

  updateTags(communityBuildId, tags): Observable<any> {
    const params = new HttpParams().set('community_build_id', communityBuildId);
    return this.http.put<any>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.UPDATE_TAGS),
      { tags },
      { params },
    );
  }

  updatePublishStatus(communityBuildId, publishStatus): Observable<boolean> {
    return this.http.put<any>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.UPDATE_PUBLISH_STATUS), {
      community_build_id: communityBuildId,
      publish_status: publishStatus,
    });
  }

  destroy(communityBuildId): Observable<ICommunityBuild> {
    const params = new HttpParams().set('community_build_id', communityBuildId);
    return this.http.delete<ICommunityBuild>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.DELETE), {
      params,
    });
  }

  confirmTeammateInvite(communityBuildId, token, decline): Observable<boolean> {
    return this.http.post<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.CONFIRM_TEAMMATE_INVITE),
      {
        community_build_id: communityBuildId,
        token,
        decline: decline,
      },
    );
  }

  resendTeammateInvite(communityBuildId, userRolesUserId): Observable<boolean> {
    return this.http.post<boolean>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.RESEND_TEAMMATE_INVITE), {
      community_build_id: communityBuildId,
      user_roles_user_id: userRolesUserId,
    });
  }

  removeTeammate(communityBuildId, userId) {
    const params = new HttpParams().set('community_build_id', communityBuildId).set('user_roles_user_id', userId);
    return this.http.delete<any>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.REMOVE_TEAMMATE), {
      params,
    });
  }

  pGetAll(
    order_by?: string,
    month?: boolean,
    year?: boolean,
    allTime?: boolean,
  ): Observable<IPagination<ICommunityBuild>> {
    let params = new HttpParams();
    if (month) {
      params = params.set('month', month);
    }
    if (year) {
      params = params.set('year', year);
    }
    if (allTime) {
      params = params.set('all-time', allTime);
    }
    if (order_by) {
      params = params.set('order_by', order_by);
    }
    return this.http.get<IPagination<ICommunityBuild>>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.PUBLIC.INDEX),
      {
        params,
      },
    );
  }

  pShow(communityBuildId): Observable<ICommunityBuild> {
    const params = new HttpParams().set('community_build_id', communityBuildId);
    return this.http.get<ICommunityBuild>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.PUBLIC.SHOW), {
      params,
    });
  }

  pGetFeaturedProjects(entity_type): Observable<IPagination<ICommunityBuild>> {
    const params = new HttpParams().set('entity_type', entity_type);
    return this.http.get<IPagination<ICommunityBuild>>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.PUBLIC.FEATURED_ITEMS),
      {
        params,
      },
    );
  }

  pGetTopBuilders(count: number, page: number, month?: boolean, year?: boolean, allTime?: boolean): Observable<any> {
    let params = new HttpParams().set('count', count).set('page', page);
    if (month) {
      params = params.set('month', month);
    }
    if (year) {
      params = params.set('year', year);
    }
    if (allTime) {
      params = params.set('all-time', allTime);
    }
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.PUBLIC.TOP_BUILDERS), {
      params,
    });
  }
}
