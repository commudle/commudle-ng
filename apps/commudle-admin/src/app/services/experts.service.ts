import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { API_ROUTES } from '@commudle/shared-services';
import { Observable } from 'rxjs';

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

  getExpertUsers(id): Observable<any> {
    const params = new HttpParams().set('badge_id', id);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.EXPERTS.INDEX_EXPERTS), {
      params,
    });
  }
}
