import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { Observable } from 'rxjs';
import { IBadge } from 'projects/shared-models/badge.model';
import { IBadges } from 'projects/shared-models/badges.model';
import { IUserBadges } from 'projects/shared-models/user_badges.model';

@Injectable({
  providedIn: 'root'
})
export class SysAdminBadgesService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }

  getAllBadges(page?: number, count?: number): Observable<IBadges> {
    let params = new HttpParams();

    if (page) {
      params = params.append('page', String(page));
    }
    if (count) {
      params = params.append('count', String(count));
    }

    return this.http.get<IBadges>(
      this.apiRoutesService.getRoute(API_ROUTES.BADGES.INDEX), { params }
    );
  }

  getUserBadges(page?: number, count?: number): Observable<IUserBadges> {
    let params = new HttpParams();

    if (page) {
      params = params.append('page', String(page));
    }
    if (count) {
      params = params.append('count', String(count));
    }
    return this.http.get<IUserBadges>(
      this.apiRoutesService.getRoute(API_ROUTES.BADGES.ASSIGN), { params }
    );
  }

  getBadgeById(badgeId: number): Observable<IBadge> {
    const params = new HttpParams().set('badge_id', String(badgeId));

    return this.http.get<IBadge>(
      this.apiRoutesService.getRoute(API_ROUTES.BADGES.SHOW), { params }
    );
  }

  createBadge(formData): Observable<IBadge> {
    return this.http.post<IBadge>(
      this.apiRoutesService.getRoute(API_ROUTES.BADGES.CREATE), formData
    );
  }

  updateBadge(formData, badgeId: number): Observable<IBadge> {
    const params = new HttpParams().set('badge_id', String(badgeId));

    return this.http.put<IBadge>(
      this.apiRoutesService.getRoute(API_ROUTES.BADGES.UPDATE), formData, { params }
    );
  }

  deleteBadge(badgeId: number): Observable<boolean> {
    const params = new HttpParams().set('badge_id', String(badgeId));

    return this.http.delete<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.BADGES.UPDATE), { params }
    );
  }
}
