import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ISocialResource} from '@commudle/shared-models';
import {API_ROUTES} from '@commudle/shared-services';
import {ApiRoutesService} from '@commudle/shared-services';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialResourceService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) {
  }

  // create social resource
  create(socialResourceData, tags): Observable<ISocialResource> {
    return this.http.post<ISocialResource>(
      this.apiRoutesService.getRoute(API_ROUTES.SOCIAL_RESOURCES.CREATE), {
        social_resource: socialResourceData,
        tags
      }
    )
  }

  // update the display order
  updateDisplayOrder(displayOrderData): Observable<boolean> {
    return this.http.post<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.SOCIAL_RESOURCES.UPDATE_DISPLAY_ORDER), {
        display_orders: displayOrderData
      }
    );
  }

  // delete a social resource
  destroy(socialResourceId): Observable<boolean> {
    const params = new HttpParams().set('social_resource_id', socialResourceId);
    return this.http.delete<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.SOCIAL_RESOURCES.DESTROY), {params}
    );
  }
}
