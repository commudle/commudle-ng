import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { IQuestionTypes } from 'apps/shared-models/question_types.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionTypesResolver implements Resolve<IQuestionTypes> {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) {  }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<IQuestionTypes> {
    return this.http.get<IQuestionTypes>(
      this.apiRoutesService.getRoute(API_ROUTES.ALL_QUESTION_TYPES));

  }
}
