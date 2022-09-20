import { Injectable } from '@angular/core';
import { ICommunities } from '@commudle/shared-models';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from '@commudle/shared-services';
import { API_ROUTES } from '@commudle/shared-services';
import { ICommunity } from '@commudle/shared-models';
import { IAdminSurvey } from '@commudle/shared-models';
import { IAdminSurveys } from '@commudle/shared-models';

@Injectable({
  providedIn: 'root'
})
export class AdminSurveysService {


  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  getAdminSurveys(): Observable<IAdminSurveys> {
    return this.http.get<IAdminSurveys>(
      this.apiRoutesService.getRoute(API_ROUTES.ADMIN_SURVEYS.INDEX)
    );
  }


  updateStatus(status, adminSurveyId): Observable<boolean> {
    return this.http.put<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.ADMIN_SURVEYS.UPDATE_STATUS), {
        admin_survey_id: adminSurveyId,
        status
      }
    );
  }


  toggleMultiResponse(adminSurveyId): Observable<boolean> {
    return this.http.put<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.ADMIN_SURVEYS.TOGGLE_MULTI_RESPONSE), {
        admin_survey_id: adminSurveyId,
      }
    );
  }

}
