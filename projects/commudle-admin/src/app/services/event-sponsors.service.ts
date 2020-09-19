import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IEventUpdates } from 'projects/shared-models/event_updates.model';
import { IEventUpdate } from 'projects/shared-models/event_update.model';
import { IEventSponsor } from 'projects/shared-models/event_sponsor.model';
import { ISponsors } from 'projects/shared-models/sponsors.model';
import { ISponsor } from 'projects/shared-models/sponsor.model';
import { IEventSponsors } from 'projects/shared-models/event_sponsors.model';

@Injectable({
  providedIn: 'root'
})
export class EventSponsorsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  index(eventId): Observable<IEventSponsors> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEventSponsors>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_SPONSORS.INDEX), {params}
    );
  }

  create(eventId, formData): Observable<IEventSponsor> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.post<IEventSponsor>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_SPONSORS.CREATE), formData, {params}
    );
  }

  addExistingSponsor(eventId, sponsorId): Observable<IEventSponsor> {
    let params = new HttpParams().set('event_id', eventId).set('sponsor_id', sponsorId);
    return this.http.post<IEventSponsor>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_SPONSORS.ADD_EXISTING_SPONSOR), {}, {params}
    );
  }

  destroy(eventSponsorId): Observable<any> {
    let params = new HttpParams().set('event_sponsor_id', eventSponsorId);
    return this.http.delete<any>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_SPONSORS.DESTROY), {params}
    );
  }


  getExistingSponsors(eventId): Observable<ISponsors> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<ISponsors>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_SPONSORS.EXISTING_SPONSORS), {params}
    );
  }


  pIndex(eventId): Observable<IEventSponsors> {
    let params = new HttpParams().set('event_id', eventId);
    return this.http.get<IEventSponsors>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENT_SPONSORS.PUBLIC.INDEX), {params}
    );
  }

}
