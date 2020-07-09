import { Injectable } from '@angular/core';
import { ICommunities } from 'projects/shared-models/communities.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ICommunity } from 'projects/shared-models/community.model';
import { ICommunityBuild } from 'projects/shared-models/community-build.model';

@Injectable({
  providedIn: 'root'
})
export class CommunityBuildsService {


  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }

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


}
