import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from '@commudle/shared-services';
import { API_ROUTES } from '@commudle/shared-services';
import { IEventLocations } from '@commudle/shared-models';
import { IEventLocation } from '@commudle/shared-models';

@Injectable({
  providedIn: 'root'
})
export class EventLocationsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  getEventLocations(eventId): Observable<IEventLocations> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEventLocations>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_LOCATIONS.GET), { params: params }
    );
  }


  createEventLocation(eventId, eventLocation): Observable<IEventLocation> {
    return this.http.post<IEventLocation>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_LOCATIONS.CREATE), {
        event_id: eventId,
        event_location: eventLocation
      }
    );
  }


  updateEventLocation(eventLocationId, eventLocation): Observable<IEventLocation> {
    return this.http.put<IEventLocation>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_LOCATIONS.UPDATE), {
        event_location_id: eventLocationId,
        event_location: eventLocation
      }
    );
  }

  deleteEventLocation(eventLocationId): Observable<any> {
    let params = new HttpParams().set('event_location_id', eventLocationId);

    return this.http.delete<any>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_LOCATIONS.DELETE), { params }
    );
  }

  pGetEventLocations(eventId): Observable<IEventLocations> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEventLocations>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_LOCATIONS.PUBLIC_INDEX), { params }
    );
  }

}
