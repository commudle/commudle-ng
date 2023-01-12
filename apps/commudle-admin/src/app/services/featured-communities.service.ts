import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFeaturedCommunities } from 'apps/shared-models/featured-communities.model';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
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
