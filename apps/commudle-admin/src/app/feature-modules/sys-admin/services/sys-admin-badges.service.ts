import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBadge } from '@commudle/shared-models';
import { IBadges } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SysAdminBadgesService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getAllBadges(page?: number, count?: number): Observable<IBadges> {
    let params = new HttpParams();

    if (page) {
      params = params.append('page', String(page));
    }
    if (count) {
      params = params.append('count', String(count));
    }

    return this.http.get<IBadges>(this.apiRoutesService.getRoute(API_ROUTES.BADGES.INDEX), { params });
  }

  getBadgeById(badgeId: number): Observable<IBadge> {
    const params = new HttpParams().set('badge_id', String(badgeId));

    return this.http.get<IBadge>(this.apiRoutesService.getRoute(API_ROUTES.BADGES.SHOW), { params });
  }

  createBadge(formData): Observable<IBadge> {
    return this.http.post<IBadge>(this.apiRoutesService.getRoute(API_ROUTES.BADGES.CREATE), formData);
  }

  updateBadge(formData, badgeId: number): Observable<IBadge> {
    const params = new HttpParams().set('badge_id', String(badgeId));

    return this.http.put<IBadge>(this.apiRoutesService.getRoute(API_ROUTES.BADGES.UPDATE), formData, { params });
  }

  deleteBadge(badgeId: number): Observable<boolean> {
    const params = new HttpParams().set('badge_id', String(badgeId));

    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.BADGES.UPDATE), { params });
  }
}
