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
export class SDataFormsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getDataFormDetails(dataFormId): Observable<IDataForm> {
    let params = new HttpParams().set('data_form_id', dataFormId);
    return this.http.get<IDataForm>(this.apiRoutesService.getRoute(API_ROUTES.GET_DATA_FORM), { params: params });
  }

  isMemberOfAllCollaboratingCommunities(event_id): Observable<boolean> {
    let params = new HttpParams().set('event_id', event_id);
    return this.http.get<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENTS.IS_MEMBER_OF_ALL_COLLABORATING_COMMUNITIES),
      { params: params },
    );
  }
}
