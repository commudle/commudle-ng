import { Injectable } from '@angular/core';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { IMiniUserProfile } from 'projects/shared-models/mini-user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class MiniUserProfileService {
  constructor(private http: HttpClient, private apiRouteService: ApiRoutesService) {}

  getUserMiniProfile(username: string) {
    const params = new HttpParams().set('username', username);
    return this.http.get<IMiniUserProfile>(this.apiRouteService.getRoute(API_ROUTES.USERS.MINI_PROFILE), { params });
  }
}
