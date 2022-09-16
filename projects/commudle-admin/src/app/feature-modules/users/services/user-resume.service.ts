import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserResume } from 'projects/shared-models/user_resume.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserResumeService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getResumes(): Observable<IUserResume[]> {
    return this.http.get<IUserResume[]>(this.apiRoutesService.getRoute(API_ROUTES.USER_RESUME.INDEX));
  }

  getResume(uuid: string): Observable<IUserResume> {
    let params = new HttpParams().set('user_resume_uuid', uuid);
    return this.http.get<IUserResume>(this.apiRoutesService.getRoute(API_ROUTES.USER_RESUME.SHOW), { params });
  }

  createResume(formData: FormData): Observable<IUserResume> {
    return this.http.post<IUserResume>(this.apiRoutesService.getRoute(API_ROUTES.USER_RESUME.CREATE), formData);
  }

  updateResume(uuid: string, formData: FormData): Observable<IUserResume> {
    let params = new HttpParams().set('user_resume_uuid', uuid);
    return this.http.put<IUserResume>(this.apiRoutesService.getRoute(API_ROUTES.USER_RESUME.UPDATE), formData, {
      params,
    });
  }

  deleteResume(uuid: string): Observable<boolean> {
    let params = new HttpParams().set('user_resume_uuid', uuid);
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.USER_RESUME.DESTROY), { params });
  }
}
