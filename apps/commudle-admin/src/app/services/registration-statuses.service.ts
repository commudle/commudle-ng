import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from '@commudle/shared-services';
import { API_ROUTES } from '@commudle/shared-services';
import { IRegistrationStatuses } from '@commudle/shared-models';

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
