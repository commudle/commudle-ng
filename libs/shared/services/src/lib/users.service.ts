import { Injectable } from '@angular/core';
import { ICurrentUser } from '@commudle/shared-models';
import { HttpClient } from '@angular/common/http';
import { ApiRoutesService } from './api-routes.service';
import { API_ROUTES } from './api-routes.constants';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public signedInUser: ICurrentUser;
  private currentUser = new BehaviorSubject<ICurrentUser>(null);
  public currentUser$: Observable<ICurrentUser> = this.currentUser.asObservable();

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService,

  ) { }

  getCurrentUser(): Observable<ICurrentUser> {
    return this.http.get<ICurrentUser>(
      this.apiRoutesService.getRoute(API_ROUTES.CURRENT_USER),
      {});
  }
}
