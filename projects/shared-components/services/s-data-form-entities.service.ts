import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IDataForm } from 'projects/shared-models/data_form.model';
import { IDataForms } from 'projects/shared-models/data_forms.model';
import { IDataformEntities } from 'projects/shared-models/data_form_entities.model';


@Injectable({
  providedIn: 'root'
})
export class SDataFormEntitiesService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  getDataFormEntities(dataFormId): Observable<IDataformEntities> {
    let params = new HttpParams().set('data_form_id', dataFormId);
    return this.http.get<IDataformEntities>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITIES.INDEX), { params }
    );
  }

  emailCSV(dataFormEntityId): Observable<boolean> {
    let params = new HttpParams().set('data_form_entity_id', dataFormEntityId);
    return this.http.get<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITIES.EMAIL_CSV), { params }
    );
  }

}
