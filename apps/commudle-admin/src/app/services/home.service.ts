import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiRoutesService} from '@commudle/shared-services';
import {API_ROUTES} from '@commudle/shared-services';
import {ICommunities} from '@commudle/shared-models';
import {ILabs} from '@commudle/shared-models';
import {ICommunityBuilds} from '@commudle/shared-models';
import {IEvents} from '@commudle/shared-models';
import {IHomeSearch} from '@commudle/shared-models';
import {IFeedItems} from '@commudle/shared-models';
import {IUser} from '@commudle/shared-models';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService,
  ) {
  }

  labs(): Observable<ILabs> {
    return this.http.get<ILabs>(
      this.apiRoutesService.getRoute(API_ROUTES.HOME.LABS)
    );
  }

  communities(): Observable<ICommunities> {
    return this.http.get<ICommunities>(
      this.apiRoutesService.getRoute(API_ROUTES.HOME.COMMUNITIES)
    );
  }

  communityBuilds(): Observable<ICommunityBuilds> {
    return this.http.get<ICommunityBuilds>(
      this.apiRoutesService.getRoute(API_ROUTES.HOME.COMMUNITY_BUILDS)
    );
  }

  experts(): Observable<IUser[]> {
    return this.http.get<IUser[]>(
      this.apiRoutesService.getRoute(API_ROUTES.HOME.EXPERTS)
    );
  }

  pCommunities(): Observable<ICommunities> {
    return this.http.get<ICommunities>(
      this.apiRoutesService.getRoute(API_ROUTES.HOME.PUBLIC.COMMUNITIES)
    );
  }

  pLabs(): Observable<ILabs> {
    return this.http.get<ILabs>(
      this.apiRoutesService.getRoute(API_ROUTES.HOME.PUBLIC.LABS)
    );
  }

  pCommunityBuilds(): Observable<ICommunityBuilds> {
    return this.http.get<ICommunityBuilds>(
      this.apiRoutesService.getRoute(API_ROUTES.HOME.PUBLIC.COMMUNITY_BUILDS)
    );
  }

  pUpcomingEvents(): Observable<IEvents> {
    return this.http.get<IEvents>(
      this.apiRoutesService.getRoute(API_ROUTES.HOME.PUBLIC.UPCOMING_EVENTS)
    );
  }

  pPastRandomEvents(count): Observable<IEvents> {
    const params = new HttpParams().set('count', count);
    return this.http.get<IEvents>(
      this.apiRoutesService.getRoute(API_ROUTES.HOME.PUBLIC.PAST_RANDOM_EVENTS), {params}
    );
  }

  pFeed(): Observable<IFeedItems> {
    return this.http.get<IFeedItems>(
      this.apiRoutesService.getRoute(API_ROUTES.EXTERNAL_FEEDS.INDEX)
    );
  }

}
