import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  sendEmail(formData, communityId): Observable<any> {
    return this.http.post<any>(
      this.apiRoutesService.getRoute(API_ROUTES.SEND_COMMUNITY_EMAILS), {
        email_form: formData,
        community_id: communityId
       }
    );
  }



}
