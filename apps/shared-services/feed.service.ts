import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from './api-routes.service';
import { API_ROUTES } from './api-routes.constants';
import { IPaginationCount, IUpcomingEventHackathon, IActivityFeed, IPagination } from '@commudle/shared-models';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getUpcomingEventsHackathons(count, page): Observable<IPaginationCount<IUpcomingEventHackathon>> {
    const params = new HttpParams().set('count', count).set('page', page);
    return this.http.get<IPaginationCount<IUpcomingEventHackathon>>(
      this.apiRoutesService.getRoute(API_ROUTES.FEED.INDEX_UPCOMING_HACKATHONS_EVENTS),
      { params },
    );
  }

  getActivityFeed(limit?, after?): Observable<IPagination<IActivityFeed>> {
    let params = new HttpParams();
    if (limit) {
      params = params.set('limit', limit);
    }
    if (after) {
      params = params.set('after', after);
    }
    return this.http.get<IPagination<IActivityFeed>>(this.apiRoutesService.getRoute(API_ROUTES.FEED.ACTIVITY_FEED), {
      params,
    });
  }
}
