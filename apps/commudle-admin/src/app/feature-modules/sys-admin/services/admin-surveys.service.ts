import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { IAdminSurveys } from 'apps/shared-models/admin-surveys.model';

@Injectable({
  providedIn: 'root',
})
export class AdminSurveysService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getAdminSurveys(): Observable<IAdminSurveys> {
    return this.http.get<IAdminSurveys>(this.apiRoutesService.getRoute(API_ROUTES.ADMIN_SURVEYS.INDEX));
  }

  updateStatus(status, adminSurveyId): Observable<boolean> {
    return this.http.put<boolean>(this.apiRoutesService.getRoute(API_ROUTES.ADMIN_SURVEYS.UPDATE_STATUS), {
      admin_survey_id: adminSurveyId,
      status,
    });
  }

  toggleMultiResponse(adminSurveyId): Observable<boolean> {
    return this.http.put<boolean>(this.apiRoutesService.getRoute(API_ROUTES.ADMIN_SURVEYS.TOGGLE_MULTI_RESPONSE), {
      admin_survey_id: adminSurveyId,
    });
  }
}
