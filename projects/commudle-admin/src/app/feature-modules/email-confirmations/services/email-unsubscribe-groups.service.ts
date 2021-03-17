import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmailUnsubscribeGroup } from 'projects/shared-models/email-unsubscribe-group.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailUnsubscribeGroupsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  getSubscription(uuid): Observable<IEmailUnsubscribeGroup> {
    const params = new HttpParams().set('email_unsubscribe_group_id', uuid);
    return this.http.get<IEmailUnsubscribeGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.EMAIL_UNSUBSCRIBE_GROUPS.SHOW), {params}
    );
  }


  toggleSubscription(uuid): Observable<boolean> {
    const params = new HttpParams().set('email_unsubscribe_group_id', uuid);
    return this.http.post<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.EMAIL_UNSUBSCRIBE_GROUPS.TOGGLE_USER_SUBSCRIPTION), {}, {params}
    );
  }

}
