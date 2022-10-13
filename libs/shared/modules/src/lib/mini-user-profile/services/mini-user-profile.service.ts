import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMiniUserProfile } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MiniUserProfileService {
  constructor(private http: HttpClient, private apiRouteService: ApiRoutesService) {}

  getUserMiniProfile(username: string): Observable<IMiniUserProfile> {
    const params = new HttpParams().set('username', username);
    return this.http.get<IMiniUserProfile>(this.apiRouteService.getRoute(API_ROUTES.USERS.MINI_PROFILE), { params });
  }
}
