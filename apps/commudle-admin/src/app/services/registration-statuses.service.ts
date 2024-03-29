import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { IRegistrationStatuses } from 'apps/shared-models/registration_statuses.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationStatusesService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  getRegistrationStatuses(): Observable<IRegistrationStatuses> {
    return this.http.get<IRegistrationStatuses>(
      this.apiRoutesService.getRoute(API_ROUTES.GET_REGISTRATION_STATUSES)
    );
  }

}
