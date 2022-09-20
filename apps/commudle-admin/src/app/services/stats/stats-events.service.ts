import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDiscussions, IPolls } from '@commudle/shared-models';
import { API_ROUTES, ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatsEventsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  uniqueVisitors(eventId): Observable<any> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.STATS.EVENTS.UNIQUE_VISITORS), { params });
  }

  customRegistration(eventId): Observable<any> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.STATS.EVENTS.CUSTOM_REGISTRATION), { params });
  }

  simpleEventRegistration(eventId): Observable<any> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.STATS.EVENTS.SIMPLE_EVENT_REGISTRATION), {
      params,
    });
  }

  attendees(eventId): Observable<any> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.STATS.EVENTS.ATTENDEES), { params });
  }

  discussions(eventId): Observable<IDiscussions> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IDiscussions>(this.apiRoutesService.getRoute(API_ROUTES.STATS.EVENTS.DISCUSSIONS), { params });
  }

  polls(eventId): Observable<IPolls> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IPolls>(this.apiRoutesService.getRoute(API_ROUTES.STATS.EVENTS.POLLS), { params });
  }
}
