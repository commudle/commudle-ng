import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IEventLocations } from 'projects/shared-models/event-locations.model';
import { IEventLocationTrack } from 'projects/shared-models/event-location-track.model';

@Injectable({
  providedIn: 'root'
})
export class EventLocationTracksService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  createEventLocationTrack(eventId, eventLocationId, eventLocationTrack): Observable<IEventLocationTrack> {
    return this.http.post<IEventLocationTrack>(
      this.apiRoutesService.getRoute(API_ROUTES.CREATE_EVENT_LOCATION_TRACK),
      {
        event_id: eventId,
        event_location_id: eventLocationId,
        event_location_track: eventLocationTrack
      }
    );
  }

  updateEventLocationTrack(eventLocationTrackId, eventLocationTrack): Observable<IEventLocationTrack> {
    return this.http.patch<IEventLocationTrack>(
      this.apiRoutesService.getRoute(API_ROUTES.UPDATE_EVENT_LOCATION_TRACK),
      {
        event_location_track_id: eventLocationTrackId,
        event_location_track: eventLocationTrack
      }
    );
  }

  deleteEventLocationTrack(eventLocationTrackId): Observable<any> {
    let params = new HttpParams().set('event_location_track_id', eventLocationTrackId)
    return this.http.delete<any>(
      this.apiRoutesService.getRoute(API_ROUTES.DELETE_EVENT_LOCATION_TRACK),
      { params }
    );
  }

}
