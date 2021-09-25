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
import { IBadges } from 'projects/shared-models/badges.model';
import { ISocialResources } from 'projects/shared-models/social_resources.model';
import { ISpeakerResources } from 'projects/shared-models/speaker_resources.model';
import { IPosts } from 'projects/shared-models/posts.model';
import { IPost } from 'projects/shared-models/post.model';

@Injectable({
  providedIn: 'root',
})
export class AppUsersService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getProfile(username): Observable<IUser> {
    const params = new HttpParams().set('username', username);
    return this.http.get<IUser>(this.apiRoutesService.getRoute(API_ROUTES.USERS.GET_PROFILE), { params });
  }

  updateUserProfile(userProfileData): Observable<IUser> {
    return this.http.put<IUser>(this.apiRoutesService.getRoute(API_ROUTES.USERS.UPDATE_PROFILE), userProfileData);
  }

  updateTags(tags): Observable<ITags> {
    return this.http.post<ITags>(this.apiRoutesService.getRoute(API_ROUTES.USERS.TAGS), tags);
  }

  updateProfileBannerImage(profileBannerImageData): Observable<IAttachedFile> {
    return this.http.post<IAttachedFile>(
      this.apiRoutesService.getRoute(API_ROUTES.USERS.PROFILE_BANNER_IMAGE),
      profileBannerImageData,
    );
  }

  checkUsername(username): Observable<boolean> {
    const params = new HttpParams().set('username', username);
    return this.http.get<boolean>(this.apiRoutesService.getRoute(API_ROUTES.USERS.CHECK_USERNAME), { params });
  }

  setUsername(username): Observable<boolean> {
    return this.http.put<boolean>(this.apiRoutesService.getRoute(API_ROUTES.USERS.SET_USERNAME), { username });
  }

  getMyRoles(parentType, parentId): Observable<[]> {
    const params = new HttpParams().set('parent_type', parentType).set('parent_id', parentId);
    return this.http.get<[]>(this.apiRoutesService.getRoute(API_ROUTES.USERS.GET_MY_ROLES), { params });
  }

  // get list of communities and role of the user in it
  communities(username): Observable<IUserRolesUsers> {
    const params = new HttpParams().set('username', username);
    return this.http.get<IUserRolesUsers>(this.apiRoutesService.getRoute(API_ROUTES.USERS.COMMUNITIES), { params });
  }

  // admin panel view of list of labs
  myLabs(): Observable<ILabs> {
    return this.http.get<ILabs>(this.apiRoutesService.getRoute(API_ROUTES.USERS.MY_LABS));
  }

  // admin panel view of list of community builds
  myCommunityBuilds(): Observable<ICommunityBuilds> {
    return this.http.get<ICommunityBuilds>(this.apiRoutesService.getRoute(API_ROUTES.USERS.MY_COMMUNITY_BUILDS));
  }

  // list of labs on public profile
  labs(username): Observable<ILabs> {
    const params = new HttpParams().set('username', username);
    return this.http.get<ILabs>(this.apiRoutesService.getRoute(API_ROUTES.USERS.LABS), { params });
  }

  // list of community builds on public profile
  communityBuilds(username): Observable<ICommunityBuilds> {
    const params = new HttpParams().set('username', username);
    return this.http.get<ICommunityBuilds>(this.apiRoutesService.getRoute(API_ROUTES.USERS.COMMUNITY_BUILDS), {
      params,
    });
  }

  // get list of all the badges of a user
  badges(username): Observable<IBadges> {
    const params = new HttpParams().set('username', username);
    return this.http.get<IBadges>(this.apiRoutesService.getRoute(API_ROUTES.USERS.BADGES), { params });
  }

  // get list of all the speaker resources of a user
  speakerResources(username): Observable<ISpeakerResources> {
    const params = new HttpParams().set('username', username);
    return this.http.get<ISpeakerResources>(this.apiRoutesService.getRoute(API_ROUTES.USERS.SPEAKER_RESOURCES), {
      params,
    });
  }

  // get list of all the social resources of a user
  socialResources(username): Observable<ISocialResources> {
    const params = new HttpParams().set('username', username);
    return this.http.get<ISocialResources>(this.apiRoutesService.getRoute(API_ROUTES.USERS.SOCIAL_RESOURCES), {
      params,
    });
  }

  // check if the logged in user is following a user
  check_followee(username): Observable<boolean> {
    const params = new HttpParams().set('username', username);
    return this.http.get<boolean>(this.apiRoutesService.getRoute(API_ROUTES.USERS.CHECK_FOLLOWEE), { params });
  }

  // toggle following a user
  toggleFollow(username): Observable<boolean> {
    return this.http.post<boolean>(this.apiRoutesService.getRoute(API_ROUTES.USERS.TOGGLE_FOLLOW), { username });
  }

  // user's posts
  posts(username): Observable<IPosts> {
    const params = new HttpParams().set('username', username);
    return this.http.get<IPosts>(this.apiRoutesService.getRoute(API_ROUTES.USERS.POSTS.INDEX), { params });
  }

  // create a post
  createPost(postData): Observable<IPost> {
    return this.http.post<IPost>(this.apiRoutesService.getRoute(API_ROUTES.USERS.POSTS.CREATE), postData);
  }

  // delete a post
  deletePost(postId): Observable<boolean> {
    const params = new HttpParams().set('post_id', postId);
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.USERS.POSTS.CREATE), { params });
  }

  getFollowers(username: string): Observable<IUser[]> {
    const params = new HttpParams().set('username', username);
    return this.http.get<IUser[]>(this.apiRoutesService.getRoute(API_ROUTES.USERS.FOLLOWERS), { params });
  }

  getFollowees(username: string): Observable<IUser[]> {
    const params = new HttpParams().set('username', username);
    return this.http.get<IUser[]>(this.apiRoutesService.getRoute(API_ROUTES.USERS.FOLLOWEES), { params });
  }

  getUserEmailSubscriptions(): Observable<any> {
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.USERS.USER_EMAIL_SUBSCRIPTIONS));
  }
}
