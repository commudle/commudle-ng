import { Injectable } from '@angular/core';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';

@Injectable({
  providedIn: 'root'
})
export class MentionService {

  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) { }

  getUsers(query : string): Observable<any>{
    const params = new HttpParams().set('query', query);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.MENTIONS.USERS), { params });
  }

  getOthers(query : string): Observable<any>{
    const params = new HttpParams().set('query', query);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.MENTIONS.OTHERS), { params });
  }
}
