import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { IQuestionTypes } from 'projects/shared-models/question_types.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { Observable } from 'rxjs';
import { IQuestion } from 'projects/shared-models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionTypesService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }

  getQuestionTypes(): Observable<IQuestionTypes> {
    return this.http.get<IQuestionTypes>(
      this.apiRoutesService.getRoute(API_ROUTES.ALL_QUESTION_TYPES));
  }
}
