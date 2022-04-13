import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMainNewsletters } from 'projects/shared-models/main-newsletters.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicNewslettersService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }

  //get all published newsletters
  publicIndex(): Observable<IMainNewsletters> {
    return this.http.get<IMainNewsletters>(
      this.apiRoutesService.getRoute(API_ROUTES.PUBLIC_NEWSLETTERS.PUBLIC_INDEX)
    );
  }
}
