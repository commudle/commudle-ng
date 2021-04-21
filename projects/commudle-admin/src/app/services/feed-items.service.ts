import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IFeedItems } from 'projects/shared-models/feed-items.model';
import { IFeedItem } from 'projects/shared-models/feed-item.model';

@Injectable({
  providedIn: 'root'
})
export class FeedItemService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }

  pGetAll(): Observable<IFeedItems>{
    return this.http.get<IFeedItems>(
        this.apiRoutesService.getRoute(API_ROUTES.EXTERNAL_FEEDS.INDEX));
  }

  pShow(id): Observable<IFeedItem>{
    const params = new HttpParams().set('feed_item_id', id);
    return this.http.get<IFeedItem>(
        this.apiRoutesService.getRoute(API_ROUTES.EXTERNAL_FEEDS.SHOW), {params});
  }

}