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
export class DataFormsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  getCommunityDataForms(communityId): Observable<IDataForms> {
    let params = new HttpParams().set('community_id', communityId);

    return this.http.get<IDataForms>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_DATA_FORMS), { params: params }
    );
  }


  getDataFormDetails(dataFormId): Observable<IDataForm> {
    let params = new HttpParams().set('data_form_id', dataFormId);
    return this.http.get<IDataForm>(
      this.apiRoutesService.getRoute(API_ROUTES.GET_DATA_FORM), { params: params }
    );
  }


  // updateCommunity(communityFormData, communityId): Observable<IDataForm> {

    // let params = new HttpParams().set('community_id', communityId);
    // params.append('community_id', 'gdg-new-delhi');
    // return this.http.patch<ICommunity>(
    //   this.apiRoutesService.getRoute(API_ROUTES.UPDATE_COMMUNITY),
    //   communityFormData,
    //   {params: params}
    // );
  // }

}
