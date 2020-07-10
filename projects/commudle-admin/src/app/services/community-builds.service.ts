import { Injectable } from '@angular/core';
import { ICommunities } from 'projects/shared-models/communities.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ICommunity } from 'projects/shared-models/community.model';
import { ICommunityBuild } from 'projects/shared-models/community-build.model';
import { ICommunityBuilds } from 'projects/shared-models/community-builds.model';

@Injectable({
  providedIn: 'root'
})
export class CommunityBuildsService {


  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  getAll(): Observable<ICommunityBuilds> {
    return this.http.get<ICommunityBuilds>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.INDEX)
    );
  }

  show(communityBuildId): Observable<ICommunityBuild> {
    const params = new HttpParams().set('community_build_id', communityBuildId);
    return this.http.get<ICommunityBuild>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.SHOW), {params}
    );
  }



  create(commmunityBuild): Observable<ICommunityBuild> {
    return this.http.post<ICommunityBuild>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.CREATE), commmunityBuild
    );
  }

  update(communityBuildId, commmunityBuild): Observable<ICommunityBuild> {
    const params = new HttpParams().set('community_build_id', communityBuildId);
    return this.http.put<ICommunityBuild>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.UPDATE),
      commmunityBuild,
      {
        params
      },
    );
  }

  updateTags(communityBuildId, tags): Observable<any> {
    const params = new HttpParams().set('community_build_id', communityBuildId);
    return this.http.put<any>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.UPDATE_TAGS),
      { tags },
      { params }
    );
  }


  updatePublishStatus(communityBuildId, publishStatus): Observable<boolean> {
    const params = new HttpParams().set('community_build_id', communityBuildId);
    return this.http.put<any>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.UPDATE_PUBLISH_STATUS),
      {
        community_build_id: communityBuildId,
        publish_status: publishStatus
      }
    );
  }


  pShow(communityBuildId): Observable<ICommunityBuild> {
    const params = new HttpParams().set('community_build_id', communityBuildId);
    return this.http.get<ICommunityBuild>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_BUILDS.PUBLIC.SHOW), {params}
    );
  }


}
