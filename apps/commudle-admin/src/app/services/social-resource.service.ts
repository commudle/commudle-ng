import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from 'apps/shared-models/pagination.model';
import { ISocialResource } from 'apps/shared-models/social_resource.model';
import { ISpeakerResource } from 'apps/shared-models/speaker_resource.model';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocialResourceService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  // create social resource
  create(socialResourceData, tags): Observable<ISocialResource> {
    return this.http.post<ISocialResource>(this.apiRoutesService.getRoute(API_ROUTES.SOCIAL_RESOURCES.CREATE), {
      social_resource: socialResourceData,
      tags,
    });
  }

  // update the display order
  updateDisplayOrder(displayOrderData): Observable<boolean> {
    return this.http.post<boolean>(this.apiRoutesService.getRoute(API_ROUTES.SOCIAL_RESOURCES.UPDATE_DISPLAY_ORDER), {
      display_orders: displayOrderData,
    });
  }

  // delete a social resource
  destroy(socialResourceId): Observable<boolean> {
    const params = new HttpParams().set('social_resource_id', socialResourceId);
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.SOCIAL_RESOURCES.DESTROY), { params });
  }

  getSpeakersContent(after?, limit?): Observable<IPagination<ISpeakerResource>> {
    let params = new HttpParams();
    if (after) {
      params = params.set('after', after);
    }
    if (limit) {
      params = params.set('limit', limit);
    }
    return this.http.get<IPagination<ISpeakerResource>>(
      this.apiRoutesService.getRoute(API_ROUTES.SOCIAL_RESOURCES.PUBLIC.INDEX),
      {
        params,
      },
    );
  }
}
