import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';

@Injectable({
  providedIn: 'root'
})
export class DataFormEntityResponsesService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  getExistingResponse(dataFormEntityId): Observable<any> {
    const params = new HttpParams().set('data_form_entity_id', dataFormEntityId)
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITY_RESPONSES.EXISTING_RESPONSES), { params }
    );
  }


  submitDataFormEntityResponse(dataFormEntityId, dferData): Observable<any> {

    return this.http.post<any>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITY_RESPONSES.SUBMIT_FORM_RESPONSE),
      {
        data_form_entity_id: dataFormEntityId,
        data_form_entity_response: dferData
      }
    );
  }



}
