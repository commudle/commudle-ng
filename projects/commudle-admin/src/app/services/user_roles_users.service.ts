import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IUserRolesUser } from 'projects/shared-models/user_roles_user.model';
import { IUserRolesUsers } from 'projects/shared-models/user_roles_users.model';


@Injectable({
  providedIn: 'root'
})
export class UserRolesUsersService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  getCommunityUsersByRole(communityId, userRoleName): Observable<IUserRolesUsers> {
    let params = new HttpParams().set('community_id', communityId).set('user_role_name', userRoleName);
    return this.http.get<IUserRolesUsers>(
      this.apiRoutesService.getRoute(API_ROUTES.GET_ADMIN_COMMUNITY_USERS_BY_ROLE), { params }
    );
  }

  createUserRolesUser(communityId, userRolesUserData): Observable<IUserRolesUser> {
    return this.http.post<IUserRolesUser>(
      this.apiRoutesService.getRoute(API_ROUTES.CREATE_USER_ROLES_USER), {
        community_id: communityId,
        user_roles_user: userRolesUserData
      }
    );
  }

  removeUserRolesUser(userRolesUserId): Observable<any> {
    let params = new HttpParams().set('user_roles_user_id', userRolesUserId);

    return this.http.delete<any>(
      this.apiRoutesService.getRoute(API_ROUTES.DELETE_USER_ROLES_USER), { params }
    );

  }

  resendInvitation(userRolesUserId): Observable<any> {
    let params = new HttpParams().set('user_roles_user_id', userRolesUserId);

    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.RESEND_USER_ROLES_USER_INVITATION), { params }
    );
  }
}
