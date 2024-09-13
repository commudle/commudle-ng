import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { IDataFormEntity } from 'apps/shared-models/data_form_entity.model';

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

  updateAutomation(dataFormEntityId, autoCloseResponsesCount): Observable<IDataFormEntity> {
    return this.http.put<IDataFormEntity>(this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITIES.AUTOMATION), {
      data_form_entity_id: dataFormEntityId,
      auto_close_responses_count: autoCloseResponsesCount,
    });
  }

  checkFormStatus(dataFormEntityId): Observable<any> {
    const params = new HttpParams().set('data_form_entity_id', dataFormEntityId);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITIES.FORM_STATUS), {
      params,
    });
  }

  getDataFormEntity(dataFormEntityId): Observable<IDataFormEntity> {
    const params = new HttpParams().set('data_form_entity_id', dataFormEntityId);
    return this.http.get<IDataFormEntity>(this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITIES.SHOW), {
      params,
    });
  }

  checkAlreadyFilledEntryPassForm(dataFormEntityId): Observable<any> {
    const params = new HttpParams().set('data_form_entity_id', dataFormEntityId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITIES.CHECK_ALREADY_FILLED_ENTRY_PASS_FORM),
      {
        params,
      },
    );
  }
}
