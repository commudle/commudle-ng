import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISearch } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getSearchResults(query: string, page = 1, count = 10): Observable<ISearch> {
    const params = new HttpParams().set('q', query).set('page', page.toString()).set('count', count.toString());
    return this.http.get<ISearch>(this.apiRoutesService.getRoute(API_ROUTES.SEARCH.INDEX), { params });
  }
}
