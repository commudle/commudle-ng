import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { IDataForm } from 'apps/shared-models/data_form.model';
import { IDataForms } from 'apps/shared-models/data_forms.model';

@Injectable({
  providedIn: 'root',
})
export class DataFormsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getCommunityDataForms(parentId): Observable<IDataForms> {
    const params = new HttpParams().set('community_id', parentId);

    return this.http.get<IDataForms>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_DATA_FORMS), {
      params: params,
    });
  }

  getDataFormDetails(dataFormId): Observable<IDataForm> {
    const params = new HttpParams().set('data_form_id', dataFormId);

    return this.http.get<IDataForm>(this.apiRoutesService.getRoute(API_ROUTES.GET_DATA_FORM), { params: params });
  }

  getDataFormList(parentId, parentType): Observable<IDataForms> {
    let params = new HttpParams();
    switch (parentType) {
      case 'Kommunity': {
        params = params.set('community_id', parentId);
        break;
      }
      case 'CommunityGroup': {
        params = params.set('community_group_id', parentId);
        break;
      }
    }

    return this.http.get<IDataForms>(this.apiRoutesService.getRoute(API_ROUTES.LIST), { params: params });
  }

  updateDataForm(dataForm): Observable<IDataForm> {
    return this.http.put<IDataForm>(this.apiRoutesService.getRoute(API_ROUTES.UPDATE_DATA_FORM), {
      data_form: dataForm,
      data_form_id: dataForm.id,
    });
  }

  createDataForm(dataForm, parentId, parentType): Observable<IDataForm> {
    return this.http.post<IDataForm>(this.apiRoutesService.getRoute(API_ROUTES.CREATE_DATA_FORM), {
      data_form: dataForm,
      parent_id: parentId,
      parent_type: parentType,
    });
  }

  cloneCommunityForm(dataFormId): Observable<IDataForm> {
    return this.http.post<IDataForm>(this.apiRoutesService.getRoute(API_ROUTES.CLONE_COMMUNITY_DATA_FORM), {
      data_form_id: dataFormId,
    });
  }
}
