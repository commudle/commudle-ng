import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from './api-routes.constants';
import { ApiRoutesService } from './api-routes.service';

@Injectable({
  providedIn: 'root',
})
export class EmailCodeService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  sendVerificationEmail(email: string): Observable<any> {
    return this.http.post<any>(this.apiRoutesService.getRoute(API_ROUTES.EMAIL_CODE_AUTH.CREATE), { email });
  }

  loginUser(formData: { email: string; code: string }): Observable<any> {
    return this.http.post<any>(this.apiRoutesService.getRoute(API_ROUTES.EMAIL_CODE_AUTH.VERIFY), formData);
  }

  // loginUser(formData): Observable<any> {
  //   return this.http.post<any>(this.apiRoutesService.getRoute(API_ROUTES.EMAIL_CODE_AUTH.VERIFY), formData);
  // }
}
