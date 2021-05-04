import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ApiRoutesService } from "projects/shared-services/api-routes.service";
import { API_ROUTES } from "projects/shared-services/api-routes.constants";
import { IFeedItems } from "projects/shared-models/feed-items.model";
import { IFeedItem } from "projects/shared-models/feed-item.model";

@Injectable({
  providedIn: "root",
})
export class FeedItemService {
  private popular_tags_api = "http://15.207.110.193/feed/v2/popular-tags/";

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) {}

  pGetAll(page): Observable<IFeedItems> {
    const params = new HttpParams().set("page", page);
    return this.http.get<IFeedItems>(
      this.apiRoutesService.getRoute(API_ROUTES.EXTERNAL_FEEDS.INDEX),
      { params }
    );
  }

  pGetTagBasedFeed(tags, page, sort): Observable<IFeedItems> {
    let params = new HttpParams();
    for (let index in tags) {
      params = params.append("tags[]", tags[index]);
    }
    params = params.append("page", page);
    params = params.append("sort", sort);
    return this.http.get<IFeedItems>(
      this.apiRoutesService.getRoute(API_ROUTES.EXTERNAL_FEEDS.TAGS_POST),
      { params }
    );
  }

  pGetPopularFeed(page): Observable<IFeedItems> {
    const params = new HttpParams().set("page", page);
    return this.http.get<IFeedItems>(
      this.apiRoutesService.getRoute(API_ROUTES.EXTERNAL_FEEDS.POPULAR_POST),
      { params }
    );
  }

  pShow(id): Observable<IFeedItem> {
    const params = new HttpParams().set("feed_item_id", id);
    return this.http.get<IFeedItem>(
      this.apiRoutesService.getRoute(API_ROUTES.EXTERNAL_FEEDS.SHOW),
      { params }
    );
  }

  pGetPopularTags() {
    return this.http.get(this.popular_tags_api);
  }
}
