import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ICommunity } from 'apps/shared-models/community.model';
import { Observable } from 'rxjs';
import { CommunitiesService } from '../services/communities.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommunityDetailsResolver implements Resolve<ICommunity> {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService,
  ) {  }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<ICommunity> {
    // if organizer communities are already fetched then bring it from there, else fetch the communities and then filter from the list
    const communityId = route.parent.params.community_id || route.params.community_id;
    let params = new HttpParams().set('community_id', communityId);
    return this.http.get<ICommunity>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.DETAILS), { params }
    );

  }
}
