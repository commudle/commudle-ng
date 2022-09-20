import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRoutesService } from '@commudle/shared-services';
import { IQuestionTypes } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { Observable } from 'rxjs';
import { IQuestion } from '@commudle/shared-models';

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
