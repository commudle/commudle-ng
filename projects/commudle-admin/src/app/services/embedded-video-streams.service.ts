import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IEventCollaborationCommunities } from 'projects/shared-models/event_collaborations_communities.model';
import { IEventCollaborationCommunity } from 'projects/shared-models/event_collaboration_community.model';
import { IEmbeddedVideoStream } from 'projects/shared-models/embedded_video_stream.model';

@Injectable({
  providedIn: 'root'
})
export class EmbeddedVideoStreamsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  get(eventId): Observable<IEmbeddedVideoStream> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEmbeddedVideoStream>(
      this.apiRoutesService.getRoute(API_ROUTES.EMBEDDED_VIDEO_STREAMS.GET), { params }
    );
  }

  createOrUpdate(embeddedVideoStreamData): Observable<IEmbeddedVideoStream> {
    return this.http.post<IEmbeddedVideoStream>(
      this.apiRoutesService.getRoute(API_ROUTES.EMBEDDED_VIDEO_STREAMS.CREATE_UPDATE_FOR_EVENT), {
        embedded_video_stream: embeddedVideoStreamData
      }
    );
  }


  // pGet(eventId): Observable<IEventCollaborationCommunities> {
  //   let params = new HttpParams().set('event_id', eventId);
  //   return this.http.get<IEventCollaborationCommunities>(
  //     this.apiRoutesService.getRoute(API_ROUTES.EVENT_COLLABORATION_COMMUNITIES.PUBLIC_INDEX), { params }
  //   );
  // }

}
