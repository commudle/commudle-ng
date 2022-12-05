import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { IDataForm } from 'apps/shared-models/data_form.model';
import { IDataForms } from 'apps/shared-models/data_forms.model';
import { IDataFormEntityResponseGroups } from 'apps/shared-models/data_form_entity_response_groups.model';
import { IDataFormEntityResponseGroup } from 'apps/shared-models/data_form_entity_response_group.model';


@Injectable({
  providedIn: 'root'
})
export class SDataFormEntityResponseGroupsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  dataFormEntityResponses(dataFormEntityId, query, page, count): Observable<IDataFormEntityResponseGroups> {
    const params = new HttpParams().set('data_form_entity_id', dataFormEntityId).set('query', query).set('page', page).set('count', count);
    return this.http.get<IDataFormEntityResponseGroups>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITY_RESPONSE_GROUPS.DATA_FORM_ENTITY_RESPONSES), {params}
    );
  }

}
