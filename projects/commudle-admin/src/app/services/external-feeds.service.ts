import { Injectable } from '@angular/core';
import { ICommunities } from 'projects/shared-models/communities.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ISingleExternalFeed } from 'projects/shared-models/single-external-feed.model';
import { IExternalFeed } from 'projects/shared-models/external-feed.model';

@Injectable({
  providedIn: 'root'
})
export class ExternalFeedService {


  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }

  pGetAll(page, count): Observable<IExternalFeed> {
    const params = new HttpParams().set('page', page).set('count', count);
    return this.http.get<IExternalFeed>(
      this.apiRoutesService.getRoute(API_ROUTES.EXTERNAL_FEEDS.INDEX), {params}
    );
  }

  pShow(id): Observable<ISingleExternalFeed> {
    const params = new HttpParams().set('id', id);
    return this.http.get<ISingleExternalFeed>(
      this.apiRoutesService.getRoute(API_ROUTES.EXTERNAL_FEEDS.SHOW), {params}
    );
  }


}
