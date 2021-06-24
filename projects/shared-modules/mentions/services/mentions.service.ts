import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentionsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) {
  }

  getUsers(username: string): Observable<any[]> {
    const params = new HttpParams().set('username', username);
    return this.http.get<any[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }

}
