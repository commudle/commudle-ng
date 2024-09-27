import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaginationCount } from '@commudle/shared-models';
import { IAttachedFile } from 'apps/shared-models/attached-file.model';
import { IBadges } from 'apps/shared-models/badges.model';
import { ICommunityBuilds } from 'apps/shared-models/community-builds.model';
import { IDataFormEntityResponseGroup } from 'apps/shared-models/data_form_entity_response_group.model';
import { IEventStatus } from 'apps/shared-models/event_status.model';
import { IEvents } from 'apps/shared-models/events.model';
import { ILabs } from 'apps/shared-models/labs.model';
import { IPagination } from 'apps/shared-models/pagination.model';
import { IPost } from 'apps/shared-models/post.model';
import { IPosts } from 'apps/shared-models/posts.model';
import { ISocialResources } from 'apps/shared-models/social_resources.model';
import { ISpeakerResources } from 'apps/shared-models/speaker_resources.model';
import { ITags } from 'apps/shared-models/tags.model';
import { IUser } from 'apps/shared-models/user.model';
import { IUserRolesUsers } from 'apps/shared-models/user_roles_users.model';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { IUserStat } from 'libs/shared/models/src/lib/user-stats.model';
import { Observable } from 'rxjs';

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

  getSpeakerResources(username): Observable<IPagination<IEventStatus>> {
    const params = new HttpParams().set('username', username);
    return this.http.get<IPagination<IEventStatus>>(
      this.apiRoutesService.getRoute(API_ROUTES.USERS.SPEAKER_SESSIONS_DELIVERED),
      {
        params,
      },
    );
  }

  getAttendedEvents(id: number): Observable<IEvents> {
    const params = new HttpParams().set('user_id', id);
    return this.http.get<IEvents>(this.apiRoutesService.getRoute(API_ROUTES.USERS.EVENTS_ATTENDED), {
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

  getFollowers(username: string, after: string): Observable<IPagination<IUser[]>> {
    let params = new HttpParams().set('username', username);
    if (after) {
      params = params.set('after', after);
    }
    return this.http.get<IPagination<IUser[]>>(this.apiRoutesService.getRoute(API_ROUTES.USERS.FOLLOWERS), { params });
  }

  getFollowees(username: string, after: string): Observable<IPagination<IUser[]>> {
    let params = new HttpParams().set('username', username);
    if (after) {
      params = params.set('after', after);
    }
    return this.http.get<IPagination<IUser[]>>(this.apiRoutesService.getRoute(API_ROUTES.USERS.FOLLOWEES), { params });
  }

  getUserEmailSubscriptions(): Observable<any> {
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.USERS.EMAIL_UNSUBSCRIBE_GROUPS));
  }

  deactivateProfile(deleteProfile: boolean): Observable<any> {
    return this.http.post<any>(this.apiRoutesService.getRoute(API_ROUTES.USERS.DEACTIVATE_PROFILE), {
      delete_profile: deleteProfile,
    });
  }

  getProfileStats(): Observable<IUserStat> {
    return this.http.get<IUserStat>(this.apiRoutesService.getRoute(API_ROUTES.USERS.PROFILE_STATS));
  }

  getProfileByEmail(userEmail): Observable<IUser> {
    const params = new HttpParams().set('user_email', userEmail);
    return this.http.get<IUser>(this.apiRoutesService.getRoute(API_ROUTES.USERS.GET_USER_BY_EMAIL), { params });
  }

  getMyRegistrations(count?, page?): Observable<IPaginationCount<IDataFormEntityResponseGroup>> {
    let params = new HttpParams();
    if (count) {
      params = params.set('count', count);
    }
    if (page) {
      params = params.set('page', page);
    }
    return this.http.get<IPaginationCount<IDataFormEntityResponseGroup>>(
      this.apiRoutesService.getRoute(API_ROUTES.USERS.MY_REGISTRATIONS),
      { params },
    );
  }
}
