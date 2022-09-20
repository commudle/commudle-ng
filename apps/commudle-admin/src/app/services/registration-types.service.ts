import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from '@commudle/shared-services';
import { API_ROUTES } from '@commudle/shared-services';
import { IRegistrationTypes } from '@commudle/shared-models';

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
