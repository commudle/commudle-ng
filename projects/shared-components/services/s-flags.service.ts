import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { IQuestionTypes } from 'projects/shared-models/question_types.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IPoll } from 'projects/shared-models/poll.model';
import { Observable } from 'rxjs';
import { IUsers } from 'projects/shared-models/users.model';

@Injectable({
  providedIn: 'root'
})
export class SFlagsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  pGetFlagsCount(flaggableType, flaggableId): Observable<any> {
    const params = new HttpParams().set('flaggable_type', flaggableType).set('flaggable_id', flaggableId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.FLAGS.PUBLIC.COUNT), {params});
  }

}
