/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { IPagination } from '@commudle/shared-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeaturedItemsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getFeaturedItems(entityType, categoryType?): Observable<IPagination<IFeaturedItems>> {
    let params = new HttpParams();
    if (entityType) {
      params = params.set('entity_type', entityType);
    }

    if (categoryType) {
      params = params.set('category', categoryType);
    }
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.FEATURED_ITEMS.PUBLIC.SHOW), { params });
  }
}
