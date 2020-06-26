import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IDataForm } from 'projects/shared-models/data_form.model';
import { IDataForms } from 'projects/shared-models/data_forms.model';


@Injectable({
  providedIn: 'root'
})
export class SDataFormsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }




  getDataFormDetails(dataFormId): Observable<IDataForm> {
    let params = new HttpParams().set('data_form_id', dataFormId);
    return this.http.get<IDataForm>(
      this.apiRoutesService.getRoute(API_ROUTES.GET_DATA_FORM), { params: params }
    );
  }

}
