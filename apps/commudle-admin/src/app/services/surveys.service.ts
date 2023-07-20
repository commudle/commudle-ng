import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';

@Injectable({
  providedIn: 'root',
})
export class SurveysService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getSurveys(parentType: string, parentId: number): Observable<any> {
    const params = new HttpParams().set('parent_type', parentType).set('parent_id', parentId);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.SURVEYS.INDEX), { params });
  }

  updateStatus(status, adminSurveyId): Observable<boolean> {
    return this.http.put<boolean>(this.apiRoutesService.getRoute(API_ROUTES.SURVEYS.UPDATE_STATUS), {
      admin_survey_id: adminSurveyId,
      status,
    });
  }

  toggleMultiResponse(adminSurveyId): Observable<boolean> {
    return this.http.put<boolean>(this.apiRoutesService.getRoute(API_ROUTES.SURVEYS.TOGGLE_MULTI_RESPONSE), {
      admin_survey_id: adminSurveyId,
    });
  }
}
