import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEvent } from 'apps/shared-models/event.model';
import { IEventStatus } from 'apps/shared-models/event_status.model';
import { IEvents } from 'apps/shared-models/events.model';
import { IPolls } from 'apps/shared-models/polls.model';
import { IUsers } from 'apps/shared-models/users.model';
import { IHmsRecording } from 'apps/shared-modules/hms-video/models/hms-recording.model';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  updateEvent(event, eventId, community): Observable<IEvent> {
    return this.http.put<IEvent>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.UPDATE), {
      event,
      community_id: community.id,
      event_id: eventId,
    });
  }

  createEvent(event, community): Observable<IEvent> {
    return this.http.post<IEvent>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.CREATE), {
      event,
      community_id: community.id,
    });
  }

  communityEventsForEmail(communityId): Observable<IEvents> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<IEvents>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.COMMUNITY_EVENTS_FOR_EMAIL), {
      params,
    });
  }

  getEvent(eventId): Observable<IEvent> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEvent>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.GET), { params });
  }

  updateStatus(eventId, eventStatus): Observable<IEventStatus> {
    return this.http.put<IEventStatus>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.UPDATE_STATUS), {
      event_id: eventId,
      event_status: eventStatus,
    });
  }

  updateCustomRegistration(eventId, customRegistration): Observable<IEvent> {
    return this.http.put<IEvent>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.UPDATE_CUSTOM_REGISTRATION), {
      event_id: eventId,
      custom_registration: customRegistration,
    });
  }

  updateCustomAgenda(eventId, customAgenda): Observable<IEvent> {
    return this.http.put<IEvent>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.UPDATE_CUSTOM_AGENDA), {
      event_id: eventId,
      custom_agenda: customAgenda,
    });
  }

  updateHeaderImage(eventId, formData): Observable<IEvent> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.put<IEvent>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.UPDATE_HEADER_IMAGE), formData, {
      params,
    });
  }

  deleteHeaderImage(eventId): Observable<IEvent> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.delete<IEvent>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.DELETE_HEADER_IMAGE), { params });
  }

  embeddedVideoStreamPastVisitors(eventId, embeddedVideoStreamId): Observable<IUsers> {
    const params = new HttpParams().set('event_id', eventId).set('embedded_video_stream_id', embeddedVideoStreamId);
    return this.http.get<IUsers>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENTS.EMBEDDED_VIDEO_STREAM_PAST_VISITORS),
      { params },
    );
  }

  embeddedVideoStreamVisitors(eventId, embeddedVideoStreamId): Observable<IUsers> {
    const params = new HttpParams().set('event_id', eventId).set('embedded_video_stream_id', embeddedVideoStreamId);
    return this.http.get<IUsers>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.EMBEDDED_VIDEO_STREAM_VISITORS), {
      params,
    });
  }

  inviteGuestToWebinarStage(userId, hmsRoomId): Observable<any> {
    return this.http.post<any>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.INVITE_GUEST_TO_WEBINAR_STAGE), {
      user_id: userId,
      hms_room_id: hmsRoomId,
    });
  }

  pGetUpcomingEvents(): Observable<IEvents> {
    return this.http.get<IEvents>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.PUBLIC.UPCOMING));
  }

  pGetRandomPastEvents(count): Observable<IEvents> {
    const params = new HttpParams().set('count', count);
    return this.http.get<IEvents>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.PUBLIC.RANDOM_PAST), { params });
  }

  pGetCommunityEvents(communityId): Observable<IEvents> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<IEvents>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.PUBLIC.INDEX_BY_COMMUNITY), {
      params,
    });
  }

  pGetEvent(eventId): Observable<IEvent> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEvent>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.PUBLIC.GET), { params });
  }

  pGetEventVolunteers(eventId): Observable<IUsers> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IUsers>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.PUBLIC.VOLUNTEERS), { params });
  }

  getPolls(eventId: number): Observable<IPolls> {
    const params = new HttpParams().set('event_id', String(eventId));
    return this.http.get<IPolls>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.PUBLIC.POLLS), { params });
  }

  getRecordings(eventId: number): Observable<IHmsRecording[]> {
    const params = new HttpParams().set('event_id', String(eventId));
    return this.http.get<IHmsRecording[]>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.RECORDINGS), { params });
  }

  getAttendedMembers(query: string, eventId: number, page: number, count: number): Observable<IUsers> {
    const params = new HttpParams()
      .set('q', query)
      .set('event_id', String(eventId))
      .set('page', String(page))
      .set('count', String(count));
    return this.http.get<IUsers>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.ATTENDED_MEMBERS), { params });
  }

  getCommonEvents(userId: number): Observable<IEvent[]> {
    const params = new HttpParams().set('user_id', String(userId));
    return this.http.get<IEvent[]>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.COMMON_EVENTS), { params });
  }

  attendedMemberNotification(event_id: number): Observable<boolean> {
    return this.http.post<boolean>(this.apiRoutesService.getRoute(API_ROUTES.EVENTS.ATTENDED_MEMBERS_NOTIFICATION), {
      event_id,
    });
  }
}
