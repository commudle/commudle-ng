import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmbeddedVideoStream } from 'projects/shared-models/embedded_video_stream.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmbeddedVideoStreamsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  get(eventId: number): Observable<IEmbeddedVideoStream> {
    const params = new HttpParams().set('event_id', String(eventId));
    return this.http.get<IEmbeddedVideoStream>(this.apiRoutesService.getRoute(API_ROUTES.EMBEDDED_VIDEO_STREAMS.GET), {
      params,
    });
  }

  createOrUpdate(embeddedVideoStreamData): Observable<IEmbeddedVideoStream> {
    return this.http.post<IEmbeddedVideoStream>(
      this.apiRoutesService.getRoute(API_ROUTES.EMBEDDED_VIDEO_STREAMS.CREATE_UPDATE_FOR_EVENT),
      {
        embedded_video_stream: embeddedVideoStreamData,
      },
    );
  }

  pGet(streamableType: string, streamableId: number): Observable<IEmbeddedVideoStream> {
    const params = new HttpParams().set('streamable_id', String(streamableId)).set('streamable_type', streamableType);
    return this.http.get<IEmbeddedVideoStream>(
      this.apiRoutesService.getRoute(API_ROUTES.EMBEDDED_VIDEO_STREAMS.PUBLIC.GET),
      { params },
    );
  }

  startRecording(streamableId: number, streamableType: string, meetingUrl: string): Observable<boolean> {
    const params = new HttpParams()
      .set('streamable_id', String(streamableId))
      .set('streamable_type', streamableType)
      .set('meeting_url', meetingUrl);
    return this.http.get<boolean>(this.apiRoutesService.getRoute(API_ROUTES.EMBEDDED_VIDEO_STREAMS.RECORDING.START), {
      params,
    });
  }

  stopRecording(streamableId: number, streamableType: string): Observable<boolean> {
    const params = new HttpParams().set('streamable_id', String(streamableId)).set('streamable_type', streamableType);
    return this.http.get<boolean>(this.apiRoutesService.getRoute(API_ROUTES.EMBEDDED_VIDEO_STREAMS.RECORDING.STOP), {
      params,
    });
  }

  startStreaming(streamableId: number, streamableType: string, meetingUrl: string): Observable<boolean> {
    const params = new HttpParams()
      .set('streamable_id', String(streamableId))
      .set('streamable_type', streamableType)
      .set('meeting_url', meetingUrl);
    return this.http.get<boolean>(this.apiRoutesService.getRoute(API_ROUTES.EMBEDDED_VIDEO_STREAMS.STREAMING.START), {
      params,
    });
  }

  stopStreaming(streamableId: number, streamableType: string): Observable<boolean> {
    const params = new HttpParams().set('streamable_id', String(streamableId)).set('streamable_type', streamableType);
    return this.http.get<boolean>(this.apiRoutesService.getRoute(API_ROUTES.EMBEDDED_VIDEO_STREAMS.STREAMING.STOP), {
      params,
    });
  }
}
