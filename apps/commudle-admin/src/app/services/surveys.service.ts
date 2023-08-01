import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ISurveys } from 'apps/shared-models/surveys.model';

@Injectable({
  providedIn: 'root',
})
export class SurveysService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  createNewSurvey(survey, dataFormId: number, parentId, parentType): Observable<any> {
    let params = new HttpParams();
    switch (parentType) {
      case 'Kommunity': {
        params = params.set('community_id', parentId);
        break;
      }
      case 'CommunityGroup': {
        params = params.set('community_group_id', parentId);
        break;
      }
    }
    return this.http.post<any>(
      this.apiRoutesService.getRoute(API_ROUTES.SURVEYS.CREATE),
      {
        data_form_id: dataFormId,
        survey,
      },
      { params },
    );
  }

  getSurveys(parentId: number, parentType: string): Observable<ISurveys> {
    let params = new HttpParams();
    switch (parentType) {
      case 'Kommunity': {
        params = params.set('community_id', parentId);
        break;
      }
      case 'CommunityGroup': {
        params = params.set('community_group_id', parentId);
        break;
      }
    }
    return this.http.get<ISurveys>(this.apiRoutesService.getRoute(API_ROUTES.SURVEYS.INDEX), { params });
  }

  updateStatus(status, surveyId): Observable<boolean> {
    return this.http.put<boolean>(this.apiRoutesService.getRoute(API_ROUTES.SURVEYS.UPDATE_STATUS), {
      survey_id: surveyId,
      status,
    });
  }

  toggleMultiResponse(surveyId): Observable<boolean> {
    return this.http.put<boolean>(this.apiRoutesService.getRoute(API_ROUTES.SURVEYS.TOGGLE_MULTI_RESPONSE), {
      survey_id: surveyId,
    });
  }
}
