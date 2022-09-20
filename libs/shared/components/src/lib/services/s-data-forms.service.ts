import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from '@commudle/shared-services';
import { API_ROUTES } from '@commudle/shared-services';
import { IDataForm } from '@commudle/shared-models';
import { IDataForms } from '@commudle/shared-models';


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
