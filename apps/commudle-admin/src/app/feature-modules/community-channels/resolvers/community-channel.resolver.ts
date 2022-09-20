import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ICommunity } from '@commudle/shared-models';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from '@commudle/shared-services';
import { API_ROUTES } from '@commudle/shared-services';
import { ICommunityChannel } from '@commudle/shared-models';

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
