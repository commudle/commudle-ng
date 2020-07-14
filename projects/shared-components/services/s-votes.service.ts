import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { IQuestionTypes } from 'projects/shared-models/question_types.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IPoll } from 'projects/shared-models/poll.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SVotesService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  pGetVotesCount(parentId, parentType) {

  }

  pGetVoters(parentId, parentType) {

  }

}
