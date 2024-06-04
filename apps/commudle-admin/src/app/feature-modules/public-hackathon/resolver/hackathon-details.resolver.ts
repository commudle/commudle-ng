import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { IHackathon } from 'apps/shared-models/hackathon.model';

@Injectable({
  providedIn: 'root',
})
export class HackathonDetailsResolver implements Resolve<IHackathon> {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<IHackathon> {
    const hackathonId = route.parent.params.hackathon_id || route.params.hackathon_id;
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.get<IHackathon>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.PUBLIC.SHOW), { params });
  }
}
