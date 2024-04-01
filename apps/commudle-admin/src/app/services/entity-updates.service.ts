import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { EDbModels, IEntityUpdate, IPagination } from '@commudle/shared-models';

@Injectable({
  providedIn: 'root',
})
export class EntityUpdatesService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  createEntityUpdate(formData, entityId: number, entityType: EDbModels): Observable<IEntityUpdate> {
    const params = new HttpParams().set('entity_id', entityId).set('entity_type', entityType);
    return this.http.post<IEntityUpdate>(this.apiRoutesService.getRoute(API_ROUTES.ENTITY_UPDATES.CREATE), formData, {
      params,
    });
  }

  getEntityUpdates(entityId: number, entityType: EDbModels): Observable<IEntityUpdate[]> {
    const params = new HttpParams().set('entity_id', entityId).set('entity_type', entityType);
    return this.http.get<IEntityUpdate[]>(this.apiRoutesService.getRoute(API_ROUTES.ENTITY_UPDATES.INDEX), { params });
  }

  deleteEntityUpdate(entityUpdateId): Observable<boolean> {
    const params = new HttpParams().set('entity_update_id', entityUpdateId);
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.ENTITY_UPDATES.DELETE), { params });
  }

  pGetEntityUpdates(entityId: number, entityType: EDbModels, limit?, after?): Observable<IPagination<IEntityUpdate[]>> {
    let params = new HttpParams().set('entity_id', entityId).set('entity_type', entityType);
    if (limit) params = params.set('limit', limit);
    if (after) params = params.set('after', after);

    return this.http.get<IPagination<IEntityUpdate[]>>(
      this.apiRoutesService.getRoute(API_ROUTES.ENTITY_UPDATES.PUBLIC.INDEX),
      {
        params,
      },
    );
  }
}
