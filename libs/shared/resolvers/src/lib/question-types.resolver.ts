import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IQuestionTypes } from '@commudle/shared-models';
import { API_ROUTES, ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionTypesResolver implements Resolve<IQuestionTypes> {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<IQuestionTypes> {
    return this.http.get<IQuestionTypes>(this.apiRoutesService.getRoute(API_ROUTES.ALL_QUESTION_TYPES));
  }
}
