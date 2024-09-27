import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from './api-routes.service';
import { API_ROUTES } from './api-routes.constants';
import { IPaginationCount, IUpcomingEventHackathon } from '@commudle/shared-models';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getUpcomingEventsHackathons(): Observable<IPaginationCount<IUpcomingEventHackathon>> {
    return this.http.get<IPaginationCount<IUpcomingEventHackathon>>(
      this.apiRoutesService.getRoute(API_ROUTES.FEED.INDEX_UPCOMING_HACKATHONS_EVENTS),
    );
  }
}
