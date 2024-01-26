import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { IEventUpdate } from 'apps/shared-models/event_update.model';
import { EModelName, IPagination } from '@commudle/shared-models';

@Injectable({
  providedIn: 'root',
})
export class EntityUpdatesService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  createEventUpdate(formData, entityId: number, entityType: EModelName): Observable<IEventUpdate> {
    const params = new HttpParams().set('entity_id', entityId).set('entity_type', entityType);
    return this.http.post<IEventUpdate>(this.apiRoutesService.getRoute(API_ROUTES.ENTITY_UPDATES.CREATE), formData, {
      params,
    });
  }

  getEventUpdates(entityId: number, entityType: EModelName): Observable<IEventUpdate[]> {
    const params = new HttpParams().set('entity_id', entityId).set('entity_type', entityType);
    return this.http.get<IEventUpdate[]>(this.apiRoutesService.getRoute(API_ROUTES.ENTITY_UPDATES.INDEX), { params });
  }

  deleteEventUpdate(entityUpdateId): Observable<boolean> {
    const params = new HttpParams().set('entity_update_id', entityUpdateId);
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.ENTITY_UPDATES.DELETE), { params });
  }

  pGetEventUpdates(entityId: number, entityType: EModelName, limit?, after?): Observable<IPagination<IEventUpdate[]>> {
    let params = new HttpParams().set('entity_id', entityId).set('entity_type', entityType);
    if (limit) params = params.set('limit', limit);
    if (after) params = params.set('after', after);

    return this.http.get<IPagination<IEventUpdate[]>>(
      this.apiRoutesService.getRoute(API_ROUTES.ENTITY_UPDATES.PUBLIC.INDEX),
      {
        params,
      },
    );
  }
}
