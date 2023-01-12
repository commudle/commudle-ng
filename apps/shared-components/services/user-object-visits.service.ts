import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { IQuestionTypes } from 'apps/shared-models/question_types.model';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { IPoll } from 'apps/shared-models/poll.model';
import { Observable } from 'rxjs';
import { IUsers } from 'apps/shared-models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UserObjectVisitsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  create(userObjectVisit): Observable<any> {
    return this.http.post<any>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_OBJECT_VISITS.CREATE), {
        user_object_visit: userObjectVisit
      });
  }

  markEndTime(userObjectVisitId): Observable<boolean> {
    return this.http.post<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_OBJECT_VISITS.MARK_END_TIME), {
        user_object_visit_id: userObjectVisitId
      });
  }

}
