/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeaturedCommunitiesService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getFeaturedItems(entityType): Observable<any> {
    let params = new HttpParams();
    if (entityType) {
      params = params.set('entity_type', entityType);
    }
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.FEATURED_ITEMS.PUBLIC.SHOW), { params });
  }
}
