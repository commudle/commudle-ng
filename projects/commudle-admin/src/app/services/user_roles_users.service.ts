import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserRolesUser } from 'projects/shared-models/user_roles_user.model';
import { IUserRolesUsers } from 'projects/shared-models/user_roles_users.model';
import { IUsers } from 'projects/shared-models/users.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRolesUsersService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getCommunityUsersByRole(communityId, userRoleName): Observable<IUserRolesUsers> {
    let params = new HttpParams().set('community_id', communityId).set('user_role_name', userRoleName);
    return this.http.get<IUserRolesUsers>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.GET_ADMIN_COMMUNITY_USERS_BY_ROLE),
      { params },
    );
  }

  getEventVolunteers(eventId): Observable<IUserRolesUsers> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<IUserRolesUsers>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.GET_EVENT_VOLUNTEERS),
      { params },
    );
  }

  getCommunityGroupLeaders(communityGroupId): Observable<IUserRolesUsers> {
    let params = new HttpParams().set('community_group_id', communityGroupId);
    return this.http.get<IUserRolesUsers>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.GET_ADMIN_COMMUNITY_GROUP_USERS),
      { params },
    );
  }

  getCommunityMembers(query, communityId, count, page): Observable<IUserRolesUsers> {
    let params = new HttpParams()
      .set('community_id', communityId)
      .set('query', query)
      .set('count', count)
      .set('page', page);
    return this.http.get<IUserRolesUsers>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.COMMUNITY_MEMBERS),
      { params },
    );
  }

  getCommunityBlockedUsers(query, communityId, count, page): Observable<IUserRolesUsers> {
    let params = new HttpParams()
      .set('community_id', communityId)
      .set('query', query)
      .set('count', count)
      .set('page', page);
    return this.http.get<IUserRolesUsers>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.COMMUNITY_BLOCKED_USERS),
      { params },
    );
  }

  createUserRolesUser(userRolesUserData): Observable<IUserRolesUser> {
    return this.http.post<IUserRolesUser>(this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.CREATE), {
      user_roles_user: userRolesUserData,
    });
  }

  addEventVolunteer(email, eventId): Observable<IUserRolesUser> {
    return this.http.post<IUserRolesUser>(this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.CREATE), {
      email,
      event_id: eventId,
    });
  }

  removeUserRolesUser(userRolesUserId): Observable<any> {
    let params = new HttpParams().set('user_roles_user_id', userRolesUserId);

    return this.http.delete<any>(this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.DELETE), { params });
  }

  resendInvitation(userRolesUserId): Observable<any> {
    let params = new HttpParams().set('user_roles_user_id', userRolesUserId);

    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.RESEND_INVITATION), {
      params,
    });
  }

  confirmCommunityRole(token): Observable<any> {
    return this.http.put<any>(this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.ACTIVATE_COMMUNITY_ROLE), {
      token,
    });
  }

  pGetCommunityLeadersByRole(communityId, userRoleName): Observable<IUsers> {
    let params = new HttpParams().set('community_id', communityId).set('user_role_name', userRoleName);
    return this.http.get<IUsers>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.PUBLIC_GET_COMMUNITY_LEADERS_BY_ROLE),
      { params },
    );
  }

  pGetCommunityGroupLeaders(communityGroupId): Observable<IUserRolesUsers> {
    let params = new HttpParams().set('community_group_id', communityGroupId);
    return this.http.get<IUserRolesUsers>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.PUBLIC_GET_ADMIN_COMMUNITY_GROUP_USERS),
      { params },
    );
  }

  pGetCommunityMembers(communityId, page, count): Observable<IUsers> {
    let params = new HttpParams().set('community_id', communityId).set('page', page).set('count', count);
    return this.http.get<IUsers>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.PUBLIC_GET_COMMUNITY_MEMBERS),
      { params },
    );
  }

  pCheckMembership(communityId): Observable<boolean> {
    let params = new HttpParams().set('community_id', communityId);
    return this.http.get<boolean>(this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.PUBLIC_CHECK_MEMBERSHIP), {
      params,
    });
  }

  pToggleMembership(communityId): Observable<boolean> {
    return this.http.post<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.PUBLIC_TOGGLE_MEMBERSHIP),
      {
        community_id: communityId,
      },
    );
  }

  removeUser(userRolesUserIds: number[], communityId: number): Observable<boolean> {
    return this.http.post<boolean>(this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.REMOVE_USER), {
      user_roles_user_ids: userRolesUserIds,
      community_id: communityId,
    });
  }

  blockUser(userId, communityId): Observable<boolean> {
    return this.http.post<boolean>(this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.BLOCK_USER), {
      user_id: userId,
      community_id: communityId,
    });
  }

  unblockUser(userId, communityId): Observable<boolean> {
    return this.http.post<boolean>(this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.UNBLOCK_USER), {
      user_id: userId,
      community_id: communityId,
    });
  }

  getRoles(userId, communityId): Observable<IUserRolesUsers> {
    let params = new HttpParams().set('user_id', userId).set('community_id', communityId);
    return this.http.get<IUserRolesUsers>(this.apiRoutesService.getRoute(API_ROUTES.USER_ROLES_USERS.ROLES), {
      params,
    });
  }
}
