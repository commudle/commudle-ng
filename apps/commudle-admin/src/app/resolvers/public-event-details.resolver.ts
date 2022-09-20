import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from '@commudle/shared-services';
import { API_ROUTES } from '@commudle/shared-services';
import { IEvent } from '@commudle/shared-models';

@Injectable({
  providedIn: 'root'
})
export class PublicEventDetailsResolver implements Resolve<IEvent> {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) {  }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<IEvent> {
    // if organizer communities are already fetched then bring it from there, else fetch the communities and then filter from the list
    let params = new HttpParams().set('event_id', route.params.event_id);
    return this.http.get<IEvent>(
      this.apiRoutesService.getRoute(API_ROUTES.EVENTS.PUBLIC.GET), { params: params }
    );

  }
}
