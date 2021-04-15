import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IExternalFeed } from 'projects/shared-models/external-feed.model';
import { ISingleExternalFeed } from 'projects/shared-models/single-external-feed.model';

@Injectable({
  providedIn: 'root'
})
export class ExternalFeedService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }

  pGetAll(): Observable<IExternalFeed>{
    return this.http.get<IExternalFeed>(
        this.apiRoutesService.getRoute(API_ROUTES.EXTERNAL_FEEDS.INDEX));
  }

  pShow(id): Observable<ISingleExternalFeed>{
    const params = new HttpParams().set('feed_item_id', id);
    return this.http.get<ISingleExternalFeed>(
        this.apiRoutesService.getRoute(API_ROUTES.EXTERNAL_FEEDS.SHOW), {params});
  }

}