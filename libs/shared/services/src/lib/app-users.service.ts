import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { API_ROUTES } from './api-routes.constant';

@Injectable({
  providedIn: 'root',
})
export class AppUsersService {
  constructor(private http: HttpClient, private baseApiService: BaseApiService) {}

  getMyRoles(parentType, parentId): Observable<[]> {
    const params = new HttpParams().set('parent_type', parentType).set('parent_id', parentId);
    return this.http.get<[]>(this.baseApiService.getRoute(API_ROUTES.USERS.GET_MY_ROLES), { params });
  }
}
