import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IUser } from 'projects/shared-models/user.model';
import { ILabs } from 'projects/shared-models/labs.model';
import { ICommunityBuilds } from 'projects/shared-models/community-builds.model';
import { ITags } from 'projects/shared-models/tags.model';
import { IAttachedFile } from 'projects/shared-models/attached-file.model';
import { IUserRolesUsers } from 'projects/shared-models/user_roles_users.model';



@Injectable({
  providedIn: 'root'
})
export class AppUsersService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }

  getProfile(username): Observable<IUser> {
    let params = new HttpParams().set('username', username);
    return this.http.get<IUser>(
      this.apiRoutesService.getRoute(API_ROUTES.USERS.GET_PROFILE), {params}
    );
  }

  updateUserProfile(userProfileData): Observable<IUser> {
    return this.http.put<IUser>(
      this.apiRoutesService.getRoute(API_ROUTES.USERS.UPDATE_PROFILE), userProfileData
    );
  }

  updateTags(tags): Observable<ITags> {
    return this.http.post<ITags>(
      this.apiRoutesService.getRoute(API_ROUTES.USERS.UPDATE_PROFILE), tags
    );
  }

  updateProfileBannerImage(profileBannerImageData): Observable<IAttachedFile> {
    return this.http.post<IAttachedFile>(
      this.apiRoutesService.getRoute(API_ROUTES.USERS.UPDATE_PROFILE), profileBannerImageData
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


  getMyRoles(parentType, parentId): Observable<[]> {
    let params = new HttpParams().set('parent_type', parentType).set('parent_id', parentId);
    return this.http.get<[]>(
      this.apiRoutesService.getRoute(API_ROUTES.USERS.GET_MY_ROLES), {params});
  }

  // get list of communities and role of the user in it
  communities(): Observable<IUserRolesUsers> {
    return this.http.get<IUserRolesUsers>(
      this.apiRoutesService.getRoute(API_ROUTES.USERS.COMMUNITIES)
    );
  }

// admin panel view of list of labs
  myLabs(): Observable<ILabs> {
    return this.http.get<ILabs>(
      this.apiRoutesService.getRoute(API_ROUTES.USERS.MY_LABS)
    );
  }

// admin panel view of list of community builds
  myCommunityBuilds(): Observable<ICommunityBuilds> {
    return this.http.get<ICommunityBuilds>(
      this.apiRoutesService.getRoute(API_ROUTES.USERS.MY_COMMUNITY_BUILDS)
    );
  }

// list of labs on public profile
  labs(username): Observable<ILabs> {
    let params = new HttpParams().set('username', username)
    return this.http.get<ILabs>(
      this.apiRoutesService.getRoute(API_ROUTES.USERS.LABS), {params}
    );
  }

// list of community builds on public profile
  communityBuilds(username): Observable<ICommunityBuilds> {
    let params = new HttpParams().set('username', username)
    return this.http.get<ICommunityBuilds>(
      this.apiRoutesService.getRoute(API_ROUTES.USERS.COMMUNITY_BUILDS), {params}
    );
  }
}
