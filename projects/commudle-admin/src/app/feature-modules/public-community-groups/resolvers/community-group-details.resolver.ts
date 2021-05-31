import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ICommunityGroup } from 'projects/shared-models/community-group.model';

@Injectable({
  providedIn: 'root'
})
export class CommunityGroupDetailsResolver implements Resolve<ICommunityGroup> {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService,
  ) {  }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<ICommunityGroup> {
    // if organizer communities are already fetched then bring it from there, else fetch the communities and then filter from the list
    const communityGroupId = route.parent.params.community_group_id || route.params.community_group_id;
    let params = new HttpParams().set('community_group_id', communityGroupId);
    return this.http.get<ICommunityGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_GROUPS.PUBLIC.SHOW), { params }
    );

  }
}
