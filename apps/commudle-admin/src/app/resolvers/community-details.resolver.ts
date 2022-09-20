import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ICommunity } from '@commudle/shared-models';
import { API_ROUTES, ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunityDetailsResolver implements Resolve<ICommunity> {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<ICommunity> {
    // if organizer communities are already fetched then bring it from there, else fetch the communities and then filter from the list
    const communityId = route.parent.params.community_id || route.params.community_id;
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<ICommunity>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.DETAILS), { params });
  }
}
