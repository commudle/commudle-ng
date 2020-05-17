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
      this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.GET_ADMIN_COMMUNITY_USERS_BY_ROLE), { params }
    );
  }

  createUserRolesUser(communityId, userRolesUserData): Observable<IUserRolesUser> {
    return this.http.post<IUserRolesUser>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.CREATE), {
        community_id: communityId,
        user_roles_user: userRolesUserData
      }
    );
  }

  removeUserRolesUser(userRolesUserId): Observable<any> {
    let params = new HttpParams().set('user_roles_user_id', userRolesUserId);

    return this.http.delete<any>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.DELETE), { params }
    );

  }

  resendInvitation(userRolesUserId): Observable<any> {
    let params = new HttpParams().set('user_roles_user_id', userRolesUserId);

    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.RESEND_INVITATION), { params }
    );
  }

  confirmCommunityRole(token): Observable<any> {
    return this.http.put<any>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.ACTIVATE_COMMUNITY_ROLE),
      { token }
    );
  }
}
