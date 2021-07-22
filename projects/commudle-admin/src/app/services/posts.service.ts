import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPosts } from 'projects/shared-models/posts.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService,
  ) {
  }

  posts(): Observable<IPosts> {
    return this.http.get<IPosts>(
      this.apiRoutesService.getRoute(API_ROUTES.POSTS.PUBLIC_SHOW)
    );
  }

}
