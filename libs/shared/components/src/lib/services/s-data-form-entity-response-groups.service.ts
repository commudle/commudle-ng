import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDataFormEntityResponseGroups } from '@commudle/shared-models';
import { API_ROUTES, ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SDataFormEntityResponseGroupsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  dataFormEntityResponses(dataFormEntityId, query, page, count): Observable<IDataFormEntityResponseGroups> {
    const params = new HttpParams()
      .set('data_form_entity_id', dataFormEntityId)
      .set('query', query)
      .set('page', page)
      .set('count', count);
    return this.http.get<IDataFormEntityResponseGroups>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITY_RESPONSE_GROUPS.DATA_FORM_ENTITY_RESPONSES),
      { params },
    );
  }
}
