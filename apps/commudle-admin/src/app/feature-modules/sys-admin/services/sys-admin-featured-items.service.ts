/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SysAdminFeaturedItemsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getAllFeaturedItems(entityType?): Observable<any> {
    let params = new HttpParams();
    if (entityType) {
      params = params.append('entity_type', entityType);
    }
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.FEATURED_ITEMS.INDEX), {
      params,
    });
  }

  createFeaturedItems(formData: any): Observable<any> {
    return this.http.post<any>(this.apiRoutesService.getRoute(API_ROUTES.FEATURED_ITEMS.CREATE), formData);
  }

  updateFeaturedCommunity(featuredItemId: number, formData: any): Observable<any> {
    const params = new HttpParams().set('featured_item_id', featuredItemId);
    return this.http.put<any>(this.apiRoutesService.getRoute(API_ROUTES.FEATURED_ITEMS.UPDATE), formData, {
      params,
    });
  }

  deleteFeaturedCommunity(featuredItemId: number): Observable<boolean> {
    const params = new HttpParams().set('featured_item_id', featuredItemId);
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.FEATURED_ITEMS.DELETE), {
      params,
    });
  }
}
