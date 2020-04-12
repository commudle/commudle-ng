import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IEvent } from 'projects/shared-models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventDetailsResolver implements Resolve<IEvent> {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) {  }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<IEvent> {
    // if organizer communities are already fetched then bring it from there, else fetch the communities and then filter from the list
    let params = new HttpParams().set('id', route.params.id).set('community_id', route.parent.parent.params.id);
    return this.http.get<IEvent>(
      this.apiRoutesService.getRoute(API_ROUTES.GET_EVENT), { params: params }
    );

  }
}
