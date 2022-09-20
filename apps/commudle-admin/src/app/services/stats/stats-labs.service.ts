import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from '@commudle/shared-services';
import { API_ROUTES } from '@commudle/shared-services';
import { IFixedEmails } from '@commudle/shared-models';



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
