import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMainNewsletters } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicNewslettersService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  publicIndex(): Observable<IMainNewsletters> {
    return this.http.get<IMainNewsletters>(this.apiRoutesService.getRoute(API_ROUTES.PUBLIC_NEWSLETTERS.PUBLIC_INDEX));
  }
}
