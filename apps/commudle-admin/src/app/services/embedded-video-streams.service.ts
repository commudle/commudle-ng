import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmbeddedVideoStream } from '@commudle/shared-models';
import { API_ROUTES, BaseApiService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmbeddedVideoStreamsService {
  constructor(private http: HttpClient, private baseApiService: BaseApiService) {}

  get(eventId: number): Observable<IEmbeddedVideoStream> {
    const params = new HttpParams().set('event_id', String(eventId));
    return this.http.get<IEmbeddedVideoStream>(this.baseApiService.getRoute(API_ROUTES.EMBEDDED_VIDEO_STREAMS.GET), {
      params,
    });
  }

  createOrUpdate(embeddedVideoStreamData): Observable<IEmbeddedVideoStream> {
    return this.http.post<IEmbeddedVideoStream>(
      this.baseApiService.getRoute(API_ROUTES.EMBEDDED_VIDEO_STREAMS.CREATE_UPDATE_FOR_EVENT),
      {
        embedded_video_stream: embeddedVideoStreamData,
      },
    );
  }

  pGet(streamableType: string, streamableId: number): Observable<IEmbeddedVideoStream> {
    const params = new HttpParams().set('streamable_id', String(streamableId)).set('streamable_type', streamableType);
    return this.http.get<IEmbeddedVideoStream>(
      this.baseApiService.getRoute(API_ROUTES.EMBEDDED_VIDEO_STREAMS.PUBLIC.GET),
      { params },
    );
  }

  startRecording(streamableId: number, streamableType: string, meetingUrl: string): Observable<boolean> {
    return this.http.post<boolean>(this.baseApiService.getRoute(API_ROUTES.EMBEDDED_VIDEO_STREAMS.RECORDING.START), {
      streamable_id: streamableId,
      streamable_type: streamableType,
      meeting_url: meetingUrl,
    });
  }

  stopRecording(streamableId: number, streamableType: string): Observable<boolean> {
    return this.http.post<boolean>(this.baseApiService.getRoute(API_ROUTES.EMBEDDED_VIDEO_STREAMS.RECORDING.STOP), {
      streamable_id: streamableId,
      streamable_type: streamableType,
    });
  }

  startStreaming(streamableId: number, streamableType: string, meetingUrl: string): Observable<boolean> {
    return this.http.post<boolean>(this.baseApiService.getRoute(API_ROUTES.EMBEDDED_VIDEO_STREAMS.STREAMING.START), {
      streamable_id: streamableId,
      streamable_type: streamableType,
      meeting_url: meetingUrl,
    });
  }

  stopStreaming(streamableId: number, streamableType: string): Observable<boolean> {
    return this.http.post<boolean>(this.baseApiService.getRoute(API_ROUTES.EMBEDDED_VIDEO_STREAMS.STREAMING.STOP), {
      streamable_id: streamableId,
      streamable_type: streamableType,
    });
  }

  createLivestream(streamableId: number, streamableType: string): Observable<IEmbeddedVideoStream> {
    return this.http.post<IEmbeddedVideoStream>(
      this.baseApiService.getRoute(API_ROUTES.EMBEDDED_VIDEO_STREAMS.CREATE_LIVESTREAM),
      {
        streamable_id: streamableId,
        streamable_type: streamableType,
      },
    );
  }

  deleteLivestream(streamableId: number, streamableType: string): Observable<boolean> {
    return this.http.delete<boolean>(
      this.baseApiService.getRoute(API_ROUTES.EMBEDDED_VIDEO_STREAMS.DELETE_LIVESTREAM),
      {
        params: {
          streamable_id: streamableId,
          streamable_type: streamableType,
        },
      },
    );
  }
}
