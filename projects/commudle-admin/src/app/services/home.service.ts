import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiRoutesService} from 'projects/shared-services/api-routes.service';
import {API_ROUTES} from 'projects/shared-services/api-routes.constants';
import {ICommunities} from 'projects/shared-models/communities.model';
import {ILabs} from 'projects/shared-models/labs.model';
import {ICommunityBuilds} from 'projects/shared-models/community-builds.model';
import {IEvents} from 'projects/shared-models/events.model';
import {IHomeSearch} from '../../../../shared-models/home-search.model';

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
    )
  }

  communityBuilds(): Observable<ICommunityBuilds> {
    return this.http.get<ICommunityBuilds>(
      this.apiRoutesService.getRoute(API_ROUTES.HOME.COMMUNITY_BUILDS)
    )
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

  searchEverything(value: string, filters: string[]): Observable<IHomeSearch> {
    let params = new HttpParams().set('q', value);
    filters.forEach(filter => params = params.append('filters[]', filter));
    return this.http.get<IHomeSearch>(
      this.apiRoutesService.getRoute(API_ROUTES.HOME.SEARCH_ALL), {params}
    );
  }

}
