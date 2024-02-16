import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IRound, EDbModels } from '@commudle/shared-models';
import { Observable } from 'rxjs';
import { API_ROUTES } from './api-routes.constant';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class RoundService {
  constructor(private http: HttpClient, private baseApiService: BaseApiService) {}

  createRound(formData, parentType: EDbModels, parentId): Observable<IRound> {
    const params = new HttpParams().set('parent_id', parentId).set('parent_type', parentType);
    return this.http.post<IRound>(
      this.baseApiService.getRoute(API_ROUTES.ROUND.CREATE),
      { round: formData },
      {
        params,
      },
    );
  }

  updateRound(formData, roundId): Observable<IRound> {
    const params = new HttpParams().set('round_id', roundId);
    return this.http.put<IRound>(
      this.baseApiService.getRoute(API_ROUTES.ROUND.UPDATE),
      { round: formData },
      {
        params,
      },
    );
  }

  indexRounds(parentId: number | string, parentType: EDbModels): Observable<IRound[]> {
    const params = new HttpParams().set('parent_id', parentId).set('parent_type', parentType);
    return this.http.get<IRound[]>(this.baseApiService.getRoute(API_ROUTES.ROUND.INDEX), { params });
  }

  destroyRound(roundId): Observable<boolean> {
    const params = new HttpParams().set('round_id', roundId);
    return this.http.delete<boolean>(this.baseApiService.getRoute(API_ROUTES.ROUND.DELETE), { params });
  }

  // PUBLIC API

  pIndexRounds(parentId: number | string, parentType: EDbModels): Observable<IRound[]> {
    const params = new HttpParams().set('parent_id', parentId).set('parent_type', parentType);
    return this.http.get<IRound[]>(this.baseApiService.getRoute(API_ROUTES.ROUND.PUBLIC.INDEX), { params });
  }
}
