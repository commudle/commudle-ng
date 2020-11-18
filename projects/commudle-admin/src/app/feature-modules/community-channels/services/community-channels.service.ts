import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ICommunityChannels } from 'projects/shared-models/community-channels.model';


@Injectable({
  providedIn: 'root'
})
export class CommunityChannelsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService,
  ) { }

  create(communityId, channelData): Observable<ICommunityChannel> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.post<ICommunityChannel>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.CREATE), channelData, {params}
    );
  }

  index(communityId): Observable<ICommunityChannels> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<ICommunityChannels>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.INDEX), {params}
    );
  }
}
