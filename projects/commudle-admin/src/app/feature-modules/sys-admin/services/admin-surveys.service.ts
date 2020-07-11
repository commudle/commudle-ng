import { Injectable } from '@angular/core';
import { ICommunities } from 'projects/shared-models/communities.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ICommunity } from 'projects/shared-models/community.model';
import { IAdminSurvey } from 'projects/shared-models/admin-survey.model';
import { IAdminSurveys } from 'projects/shared-models/admin-surveys.model';

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

}
