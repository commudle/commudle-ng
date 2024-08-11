import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { IEventLocations } from 'apps/shared-models/event-locations.model';
import { IEventDatesLocation, IEventLocation } from 'apps/shared-models/event-location.model';

@Injectable({
  providedIn: 'root',
})
export class EventLocationsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getEventLocations(eventId): Observable<IEventLocations> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEventLocations>(this.apiRoutesService.getRoute(API_ROUTES.EVENT_LOCATIONS.GET), {
      params: params,
    });
  }

  createEventLocation(eventId, eventLocation): Observable<IEventLocation> {
    return this.http.post<IEventLocation>(this.apiRoutesService.getRoute(API_ROUTES.EVENT_LOCATIONS.CREATE), {
      event_id: eventId,
      event_location: eventLocation,
    });
  }

  updateEventLocation(eventLocationId, eventLocation): Observable<IEventLocation> {
    return this.http.put<IEventLocation>(this.apiRoutesService.getRoute(API_ROUTES.EVENT_LOCATIONS.UPDATE), {
      event_location_id: eventLocationId,
      event_location: eventLocation,
    });
  }

  deleteEventLocation(eventLocationId): Observable<any> {
    const params = new HttpParams().set('event_location_id', eventLocationId);

    return this.http.delete<any>(this.apiRoutesService.getRoute(API_ROUTES.EVENT_LOCATIONS.DELETE), { params });
  }

  pGetEventLocations(eventId): Observable<IEventLocations> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEventLocations>(this.apiRoutesService.getRoute(API_ROUTES.EVENT_LOCATIONS.PUBLIC_INDEX), {
      params,
    });
  }

  getEventDates(eventId): Observable<IEventDatesLocation> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEventDatesLocation>(
      this.apiRoutesService.getRoute(API_ROUTES.TRACK_SLOTS.PUBLIC.TRACK_SLOTS_BY_DATE),
      {
        params,
      },
    );
  }

  getLocationTracks(LocationId, date): Observable<any> {
    const params = new HttpParams().set('location_id', LocationId).set('date', date);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.TRACK_SLOTS.PUBLIC.TRACK_SLOTS_BY_DATE_AND_LOCATION),
      {
        params,
      },
    );
  }
}
