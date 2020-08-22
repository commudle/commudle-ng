import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IFixedEmails } from 'projects/shared-models/fixed-emails.model';



@Injectable({
  providedIn: 'root'
})
export class StatsCommunityBuildsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }



  userEngagement(communityBuildId): Observable<any> {
    let params = new HttpParams().set('community_build_id', communityBuildId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.STATS.COMMUNITY_BUILDS.USER_ENGAGEMENT), { params }
    );
  }

}
