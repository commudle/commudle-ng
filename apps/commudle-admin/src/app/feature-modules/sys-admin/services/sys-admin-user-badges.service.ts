import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserBadge } from 'apps/shared-models/user_badge.model';
import { IUserBadges } from 'apps/shared-models/user_badges.model';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SysAdminUserBadgesService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getUserBadges(page?: number, count?: number): Observable<IUserBadges> {
    let params = new HttpParams();

    if (page) {
      params = params.append('page', String(page));
    }
    if (count) {
      params = params.append('count', String(count));
    }
    return this.http.get<IUserBadges>(this.apiRoutesService.getRoute(API_ROUTES.USER_BADGES.INDEX), { params });
  }

  assignBadge(formData): Observable<IUserBadge> {
    return this.http.post<IUserBadge>(this.apiRoutesService.getRoute(API_ROUTES.USER_BADGES.CREATE), formData);
  }

  unassignBadge(userBadgeId: number): Observable<boolean> {
    const params = new HttpParams().set('user_badge_id', String(userBadgeId));

    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.USER_BADGES.DELETE), { params });
  }
}
