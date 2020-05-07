import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IDataFormEntity } from 'projects/shared-models/data_form_entity.model';

@Injectable({
  providedIn: 'root'
})
export class DataFormEntitiesService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  updateVisibilityStatus(newStatus, dataFormEntityId): Observable<IDataFormEntity> {
    return this.http.patch<IDataFormEntity>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITIES.UPDATE_VISIBILITY), {
        data_form_entity_id: dataFormEntityId,
        visibility: newStatus
      }
    );
  }

  getDataFormEntity(dataFormEntityId): Observable<IDataFormEntity> {
    const params = new HttpParams().set('data_form_entity_id', dataFormEntityId);
    return this.http.get<IDataFormEntity>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITIES.SHOW), { params }
    );
  }

}
