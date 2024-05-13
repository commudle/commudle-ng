import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { API_ROUTES } from '@commudle/shared-services';
import { Observable } from 'rxjs';
import { IPagination, IUser } from '@commudle/shared-models';

@Injectable({
  providedIn: 'root',
})
export class ExpertsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getExpertBadges(type): Observable<any> {
    const params = new HttpParams().set('badge_type', type);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.EXPERTS.INDEX), {
      params,
    });
  }

  getExpertUsers(id, after?, limit?): Observable<IPagination<IUser>> {
    let params = new HttpParams();
    if (id) {
      params = params.set('badge_id', id);
    }
    if (after) {
      params = params.set('after', after);
    }
    if (limit) {
      params = params.set('limit', limit);
    }
    return this.http.get<IPagination<IUser>>(this.apiRoutesService.getRoute(API_ROUTES.EXPERTS.INDEX_EXPERTS), {
      params,
    });
  }
}
