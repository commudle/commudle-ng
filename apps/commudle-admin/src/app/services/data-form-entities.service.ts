import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDataFormEntity } from '@commudle/shared-models';
import { API_ROUTES, ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataFormEntitiesService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  updateVisibilityStatus(newStatus, dataFormEntityId): Observable<IDataFormEntity> {
    return this.http.put<IDataFormEntity>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITIES.UPDATE_VISIBILITY),
      {
        data_form_entity_id: dataFormEntityId,
        visibility: newStatus,
      },
    );
  }

  getDataFormEntity(dataFormEntityId): Observable<IDataFormEntity> {
    const params = new HttpParams().set('data_form_entity_id', dataFormEntityId);
    return this.http.get<IDataFormEntity>(this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITIES.SHOW), {
      params,
    });
  }
}
