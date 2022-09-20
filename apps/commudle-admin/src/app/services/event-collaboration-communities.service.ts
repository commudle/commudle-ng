import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from '@commudle/shared-services';
import { API_ROUTES } from '@commudle/shared-services';
import { IEventCollaborationCommunities } from '@commudle/shared-models';
import { IEventCollaborationCommunity } from '@commudle/shared-models';

@Injectable({
  providedIn: 'root'
})
export class EventCollaborationCommunitiesService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  get(eventId): Observable<IEventCollaborationCommunities> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEventCollaborationCommunities>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_COLLABORATION_COMMUNITIES.INDEX), { params }
    );
  }

  create(eventId, communityId): Observable<IEventCollaborationCommunity> {
    return this.http.post<IEventCollaborationCommunity>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_COLLABORATION_COMMUNITIES.CREATE), {
        event_id: eventId,
        community_id: communityId
      }
    );
  }


  destroy(eventCollaborationCommunityId): Observable<any> {
    let params = new HttpParams().set('event_collaboration_community_id', eventCollaborationCommunityId);
    return this.http.delete<any>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_COLLABORATION_COMMUNITIES.DELETE), { params }
    );
  }

  resendInvitationMail(eventCollaborationCommunityId) {
    let params = new HttpParams().set('event_collaboration_community_id', eventCollaborationCommunityId);

    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_COLLABORATION_COMMUNITIES.RESEND_INVITATION), { params }
    );
  }

  confirmCollaboration(token): Observable<any> {
    return this.http.put<any>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_COLLABORATION_COMMUNITIES.CONFIRM),
      { token }
    );
  }

  pGet(eventId): Observable<IEventCollaborationCommunities> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEventCollaborationCommunities>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_COLLABORATION_COMMUNITIES.PUBLIC_INDEX), { params }
    );
  }

}
