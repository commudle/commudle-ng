import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from '@commudle/shared-services';
import { API_ROUTES } from '@commudle/shared-services';
import { IFixedEmails } from '@commudle/shared-models';



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
