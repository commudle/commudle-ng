import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPolls } from 'apps/shared-models/polls.model';
import { ITrackSlot } from 'apps/shared-models/track-slot.model';
import { ITrackSlots } from 'apps/shared-models/track_slots.model';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';
import { ILocations } from 'apps/shared-models/locations.model';
import { IEventLocationTrack } from 'apps/shared-models/event-location-track.model';
import { IEventDatesLocation } from 'apps/shared-models/event-location.model';

@Injectable({
  providedIn: 'root',
})
export class TrackSlotsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  createTrackSlot(newTrackSlot): Observable<ITrackSlot> {
    return this.http.post<ITrackSlot>(this.apiRoutesService.getRoute(API_ROUTES.TRACK_SLOTS.CREATE), {
      track_slot: newTrackSlot,
    });
  }

  updateTrackSlot(trackSlot, trackSlotId): Observable<ITrackSlot> {
    return this.http.put<ITrackSlot>(this.apiRoutesService.getRoute(API_ROUTES.TRACK_SLOTS.UPDATE), {
      track_slot: trackSlot,
      track_slot_id: trackSlotId,
    });
  }

  deleteTrackSlot(trackSlotId): Observable<any> {
    const params = new HttpParams().set('track_slot_id', trackSlotId);
    return this.http.delete<any>(this.apiRoutesService.getRoute(API_ROUTES.TRACK_SLOTS.DELETE), { params });
  }

  // PUBLIC METHODS
  pGetTrackSlot(trackSlotId): Observable<ITrackSlot> {
    const params = new HttpParams().set('track_slot_id', trackSlotId);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.TRACK_SLOTS.PUBLIC.GET), { params });
  }

  pToggleVote(trackSlotId): Observable<number> {
    return this.http.post<any>(this.apiRoutesService.getRoute(API_ROUTES.TRACK_SLOTS.PUBLIC.TOGGLE_VOTE), {
      track_slot_id: trackSlotId,
    });
  }

  pGetLiveEventSessions(eventId): Observable<ITrackSlots> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<ITrackSlots>(
      this.apiRoutesService.getRoute(API_ROUTES.TRACK_SLOTS.PUBLIC.LIVE_EVENT_SESSIONS),
      { params },
    );
  }

  getPolls(trackSlotId: number): Observable<IPolls> {
    const params = new HttpParams().set('track_slot_id', String(trackSlotId));
    return this.http.get<IPolls>(this.apiRoutesService.getRoute(API_ROUTES.TRACK_SLOTS.PUBLIC.POLLS), { params });
  }

  getEventDates(eventId): Observable<IEventDatesLocation> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEventDatesLocation>(
      this.apiRoutesService.getRoute(API_ROUTES.TRACK_SLOTS.TRACK_SLOTS_BY_DATE),
      {
        params,
      },
    );
  }

  getTrackSlots(location_id, date): Observable<IEventLocationTrack> {
    const params = new HttpParams().set('location_id', location_id).set('date', date);
    return this.http.get<IEventLocationTrack>(
      this.apiRoutesService.getRoute(API_ROUTES.TRACK_SLOTS.TRACK_SLOTS_BY_DATE_AND_LOCATION),
      {
        params,
      },
    );
  }
}
