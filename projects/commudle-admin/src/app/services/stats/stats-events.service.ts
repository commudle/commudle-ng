import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';



@Injectable({
  providedIn: 'root'
})
export class StatsEventsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }



  uniqueVisitors(eventId): Observable<any> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.STATS.EVENTS.UNIQUE_VISITORS), { params }
    );
  }

  customRegistration(eventId): Observable<any> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.STATS.EVENTS.CUSTOM_REGISTRATION), { params }
    );
  }


  simpleEventRegistration(eventId): Observable<any> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.STATS.EVENTS.SIMPLE_EVENT_REGISTRATION), { params }
    );
  }


  attendees(eventId): Observable<any> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.STATS.EVENTS.ATTENDEES), { params }
    );
  }



  discussions(eventId): Observable<any> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.STATS.EVENTS.DISCUSSIONS), { params }
    );
  }


  pollables(eventId): Observable<any> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.STATS.EVENTS.POLLABLES), { params }
    );
  }


}
