import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { IFixedEmails } from 'apps/shared-models/fixed-emails.model';



@Injectable({
  providedIn: 'root'
})
export class StatsLabsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  userEngagement(labId): Observable<any> {
    let params = new HttpParams().set('lab_id', labId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.STATS.LABS.USER_ENGAGEMENT), { params }
    );
  }

}
