import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISearch } from 'apps/shared-models/search.model';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getSearchResults(query: string, page = 1, count = 10, s?: string): Observable<any> {
    let params = new HttpParams().set('q', query).set('page', page.toString()).set('count', count.toString());
    if (s !== null && s !== undefined) {
      params = params.set('s', s);
    }
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.SEARCH.INDEX), { params });
  }

  getSearchResultsByScope(query: string, page, count, parentType): Observable<ISearch> {
    const params = new HttpParams()
      .set('q', query)
      .set('page', page)
      .set('count', count)
      .set('searchable_type', parentType);
    return this.http.get<ISearch>(this.apiRoutesService.getRoute(API_ROUTES.SEARCH.SCOPE), { params });
  }
}
