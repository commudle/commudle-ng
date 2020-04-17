import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IEventLocations } from 'projects/shared-models/event-locations.model';

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
      this.apiRoutesService.getRoute(API_ROUTES.GET_EVENT_LOCATIONS), { params: params }
    );
  }

}
