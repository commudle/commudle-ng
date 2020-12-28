import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ICommunity } from 'projects/shared-models/community.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';

@Injectable({
  providedIn: 'root'
})
export class CommunityChannelResolver implements Resolve<ICommunityChannel> {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService,
  ) {  }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<ICommunityChannel> {
    const communityChannelId = route.params.community_channel_id;
    let params = new HttpParams().set('community_channel_id', communityChannelId);
    return this.http.get<ICommunityChannel>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.DETAILS), { params }
    );

  }
}
