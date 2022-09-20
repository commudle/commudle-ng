import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFeaturedCommunities } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeaturedCommunitiesService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {
    // do nothing
  }

  getLatestFeaturedCommunities(): Observable<IFeaturedCommunities> {
    return this.http.get<IFeaturedCommunities>(
      this.apiRoutesService.getRoute(API_ROUTES.FEATURED_COMMUNITIES.PUBLIC.SHOW),
    );
  }
}
