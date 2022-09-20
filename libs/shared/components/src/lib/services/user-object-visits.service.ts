import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from '@commudle/shared-services';
import { IQuestionTypes } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { IPoll } from '@commudle/shared-models';
import { Observable } from 'rxjs';
import { IUsers } from '@commudle/shared-models';

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
