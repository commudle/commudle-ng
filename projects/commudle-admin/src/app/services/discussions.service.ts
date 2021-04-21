import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IDiscussion } from 'projects/shared-models/discussion.model';

@Injectable({
  providedIn: 'root'
})
export class DiscussionsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  pGetOrCreateQnAForTrackSlot(trackSlotId): Observable<IDiscussion> {
    const params = new HttpParams().set('track_slot_id', trackSlotId);
    return this.http.get<IDiscussion>(
      this.apiRoutesService.getRoute(API_ROUTES.DISCUSSIONS.PUBLIC_GET_OR_CREATE_QNA_FOR_TRACK_SLOT),
      { params }
    );
  }


  pGetOrCreateChatForTrackSlot(trackSlotId): Observable<IDiscussion> {
    const params = new HttpParams().set('track_slot_id', trackSlotId);
    return this.http.get<IDiscussion>(
      this.apiRoutesService.getRoute(API_ROUTES.DISCUSSIONS.PUBLIC_GET_OR_CREATE_CHAT_FOR_TRACK_SLOT),
      { params }
    );
  }

  pGetOrCreateQnAForEvent(eventId): Observable<IDiscussion> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IDiscussion>(
      this.apiRoutesService.getRoute(API_ROUTES.DISCUSSIONS.PUBLIC_GET_OR_CREATE_QNA_FOR_EVENT),
      { params }
    );
  }


  pGetOrCreateForEventChat(eventId): Observable<IDiscussion> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IDiscussion>(
      this.apiRoutesService.getRoute(API_ROUTES.DISCUSSIONS.PUBLIC_GET_OR_CREATE_FOR_EVENT_CHAT),
      { params }
    );
  }

  pGetOrCreateForCommunityBuildChat(communityBuildId): Observable<IDiscussion> {
    const params = new HttpParams().set('community_build_id', communityBuildId);
    return this.http.get<IDiscussion>(
      this.apiRoutesService.getRoute(API_ROUTES.DISCUSSIONS.PUBLIC_GET_OR_CREATE_FOR_COMMUNITY_BUILD_CHAT),
      { params }
    );
  }

  pGetOrCreateForLabChat(labId): Observable<IDiscussion> {
    const params = new HttpParams().set('lab_id', labId);
    return this.http.get<IDiscussion>(
      this.apiRoutesService.getRoute(API_ROUTES.DISCUSSIONS.PUBLIC_GET_OR_CREATE_FOR_LAB_CHAT),
      { params }
    );
  }


  pGetOrCreateForCommunityChannel(communityChannelId): Observable<IDiscussion> {
    const params = new HttpParams().set('community_channel_id', communityChannelId);
    return this.http.get<IDiscussion>(
      this.apiRoutesService.getRoute(API_ROUTES.DISCUSSIONS.PUBLIC_GET_OR_CREATE_FOR_COMMUNITY_CHANNEL_CHAT),
      { params }
    );
  }

  pGetOrCreateForFeedItemChat(id): Observable<IDiscussion> {
    const params = new HttpParams().set('feed_item_id', id);
    return this.http.get<IDiscussion>(
      this.apiRoutesService.getRoute(API_ROUTES.DISCUSSIONS.PUBLIC_GET_OR_CREATE_FOR_FEED_ITEM_CHAT),
      { params }
    );
  }

  communityChannelNewAttachmentMessage(formData, parentType, parentId): Observable<boolean> {
    const params = new HttpParams().set('parent_id', parentId).set('parent_type', parentType);
    return this.http.post<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.DISCUSSIONS.COMMUNITY_CHANNEL.NEW_ATTACHMENT_MESSAGE), formData,
      { params }
    );
  }


  communityChannelUpdatedAttachmentMessage(formData, userMessageId): Observable<boolean> {
    const params = new HttpParams().set('user_message_id', userMessageId);
    return this.http.post<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.DISCUSSIONS.COMMUNITY_CHANNEL.UPDATED_ATTACHMENT_MESSAGE), formData,
      { params }
    );
  }


}
