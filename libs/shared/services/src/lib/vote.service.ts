import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from './api-routes.constant';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  constructor(private http: HttpClient, private baseApiService: BaseApiService) {}

  pGetVotesCount(votableType: string, votableId: number): Observable<{ total: number; voted: boolean }> {
    return this.http.get<{ total: number; voted: boolean }>(
      this.baseApiService.getRoute(API_ROUTES.VOTES.PUBLIC.COUNT),
      { params: { votable_type: votableType, votable_id: votableId.toString() } },
    );
  }
}
