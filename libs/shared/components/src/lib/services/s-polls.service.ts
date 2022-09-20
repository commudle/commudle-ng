import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from '@commudle/shared-services';
import { IQuestionTypes } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { IPoll } from '@commudle/shared-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SPollsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }

  pGetPoll(pollId): Observable<IPoll> {
    const params = new HttpParams().set('poll_id', pollId);
    return this.http.get<IPoll>(
      this.apiRoutesService.getRoute(API_ROUTES.POLLS.PUBLIC.SHOW), {params});
  }


  pQuestionResponses(pollId, questionId): Observable<any> {
    const params = new HttpParams().set('poll_id', pollId).set('question_id', questionId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.POLLS.PUBLIC.QUESTION_RESPONSE), {params});
  }


}
