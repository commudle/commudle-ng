import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from '@commudle/shared-services';
import { API_ROUTES } from '@commudle/shared-services';
import { IEventUpdates } from '@commudle/shared-models';
import { IEventUpdate } from '@commudle/shared-models';

@Injectable({
  providedIn: 'root'
})
export class EventUpdatesService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  getEventUpdates(eventId): Observable<IEventUpdates> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEventUpdates>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_UPDATES.INDEX), { params }
    );
  }

  createEventUpdate(eventUpdateData, eventId): Observable<IEventUpdate> {
    return this.http.post<IEventUpdate>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_UPDATES.CREATE), {
        event_id: eventId,
        event_update: eventUpdateData
       }
    );
  }

  deleteEventUpdate(eventUpdateId): Observable<any> {
    const params = new HttpParams().set('event_update_id', eventUpdateId);
    return this.http.delete<any>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_UPDATES.DELETE), { params }
    );
  }




  pGetEventUpdates(eventId): Observable<IEventUpdates> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEventUpdates>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_UPDATES.PUBLIC_INDEX), { params }
    );
  }




}
