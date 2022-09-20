import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPosts } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from '@commudle/shared-services';
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
