import { Injectable } from '@angular/core';
import { ICommunities } from 'projects/shared-models/communities.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { tap } from 'rxjs/operators';
import { ICommunity } from 'projects/shared-models/community.model';

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {
  // private organizerCommunities: BehaviorSubject<ICommunity[]> = new BehaviorSubject(null);
  // public organizerCommunities$ = this.organizerCommunities.asObservable();

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  getRoleCommunities(role): Observable<ICommunities> {
    let params = new HttpParams().set('role', role);

    return this.http.get<ICommunities>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_ROLE_COMMUNITIES), { params: params }
    )
    // .pipe(
    //   tap((data: ICommunities) => {
    //     this.organizerCommunities.next(data.communities);
    //   })
    // );
  }


  getCommunityDetails(community_id): Observable<ICommunity> {
    let params = new HttpParams().set('community_id', community_id);

    return this.http.get<ICommunity>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_DETAILS), { params: params }
    );
  }


  updateCommunity(communityFormData, communityId): Observable<ICommunity> {

    let params = new HttpParams().set('community_id', communityId);
    params.append('community_id', 'gdg-new-delhi');
    return this.http.patch<ICommunity>(
      this.apiRoutesService.getRoute(API_ROUTES.UPDATE_COMMUNITY),
      communityFormData,
      {params: params}
    );
  }

}
