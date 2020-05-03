import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ICommunity } from 'projects/shared-models/community.model';
import { Observable } from 'rxjs';
import { CommunitiesService } from '../services/communities.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';

@Injectable({
  providedIn: 'root'
})
export class CommunityDetailsResolver implements Resolve<ICommunity> {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) {  }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<ICommunity> {
    // if organizer communities are already fetched then bring it from there, else fetch the communities and then filter from the list
    let params = new HttpParams().set('community_id', route.parent.params.id);
    return this.http.get<ICommunity>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.DETAILS), { params: params }
    );

  }
}
