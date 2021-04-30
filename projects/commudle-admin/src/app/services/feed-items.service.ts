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

  private feed_api = 'http://15.207.110.193/feed/v2/latest-feed/'
  private post_api = 'http://15.207.110.193/feed/v2/post/'

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

  pGetAllv2(page){
    const params = new HttpParams().set('page', page);
    return this.http.get(this.feed_api, {params});
  }

  pShowv2(id){
    const params = new HttpParams().set('id', id);
    return this.http.get(this.post_api, {params});
  }

}