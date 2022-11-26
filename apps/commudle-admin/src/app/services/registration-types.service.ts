import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { IRegistrationTypes } from 'apps/shared-models/registration_types.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationTypesService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  getRegistrationTypes(): Observable<IRegistrationTypes> {
    return this.http.get<IRegistrationTypes>(
      this.apiRoutesService.getRoute(API_ROUTES.GET_REGISTRATION_TYPES)
    );
  }

}
