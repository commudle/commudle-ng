import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES, BaseApiService } from '@commudle/shared-services';
import { Observable } from 'rxjs';
import { IMention } from '../models/mentions.model';

@Injectable({
  providedIn: 'root',
})
export class MentionsService {
  constructor(private http: HttpClient, private baseApiService: BaseApiService) {}

  getMentions(query: string): Observable<IMention> {
    const params = new HttpParams().set('query', query);
    return this.http.get<IMention>(this.baseApiService.getRoute(API_ROUTES.MENTIONS.INDEX), { params });
  }
}
