import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFeedItem, IFeedItems } from '@commudle/shared-models';
import { API_ROUTES, ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedItemService {
  private popular_tags_api = 'https://feed.commudle.com/feed/v2/popular-tags/';

  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  pGetAll(page): Observable<IFeedItems> {
    const params = new HttpParams().set('page', page);
    return this.http.get<IFeedItems>(this.apiRoutesService.getRoute(API_ROUTES.EXTERNAL_FEEDS.INDEX), { params });
  }

  pGetTagBasedFeed(tags, page, sort): Observable<IFeedItems> {
    let params = new HttpParams();
    for (const index in tags) {
      params = params.append('tags[]', tags[index]);
    }
    params = params.append('page', page);
    params = params.append('sort', sort);
    return this.http.get<IFeedItems>(this.apiRoutesService.getRoute(API_ROUTES.EXTERNAL_FEEDS.TAGS_POST), { params });
  }

  pGetPopularFeed(page): Observable<IFeedItems> {
    const params = new HttpParams().set('page', page);
    return this.http.get<IFeedItems>(this.apiRoutesService.getRoute(API_ROUTES.EXTERNAL_FEEDS.POPULAR_POST), {
      params,
    });
  }

  pShow(id): Observable<IFeedItem> {
    const params = new HttpParams().set('feed_item_id', id);
    return this.http.get<IFeedItem>(this.apiRoutesService.getRoute(API_ROUTES.EXTERNAL_FEEDS.SHOW), { params });
  }

  pGetPopularTags() {
    return this.http.get(this.popular_tags_api);
  }
}
