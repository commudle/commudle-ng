import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiRoutesService} from '@commudle/shared-services';
import {API_ROUTES} from '@commudle/shared-services';
import {ITags} from '@commudle/shared-models';
import {ITag} from '@commudle/shared-models';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class STagsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) {
  }

  getTags(): Observable<ITags> {
    return this.http.get<ITags>(
      this.apiRoutesService.getRoute(API_ROUTES.TAGS.INDEX)
    );
  }

  updateTag(tagId: number): Observable<ITag> {
    return this.http.put<ITag>(
      this.apiRoutesService.getRoute(API_ROUTES.TAGS.UPDATE), {
        tag_id: tagId
      }
    )
  }
}
