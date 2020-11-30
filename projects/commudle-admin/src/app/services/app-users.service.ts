import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IUser } from 'projects/shared-models/user.model';



@Injectable({
  providedIn: 'root'
})
export class AppUsersService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  updateUserProfile(userProfileData): Observable<IUser> {
    return this.http.put<IUser>(
      this.apiRoutesService.getRoute(API_ROUTES.USERS.UPDATE_PROFILE), userProfileData
    );
  }

  checkUsername(username): Observable<boolean> {
    let params = new HttpParams().set('username', username);
    return this.http.get<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.USERS.CHECK_USERNAME), {params});
  }

  setUsername(username): Observable<boolean> {
    return this.http.put<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.USERS.SET_USERNAME),
      {username}
      );
  }
}
