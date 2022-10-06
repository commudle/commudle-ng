import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { Observable } from 'rxjs';
import { IJobs } from 'projects/shared-models/jobs.model';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getJobsByFilter(
    page: number,
    count: number,
    category?: string,
    salary_type?: string,
    salary_currency?: string,
    location_type?: string,
    job_type?: string,
    status?: string,
  ): Observable<IJobs> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('count', String(count))
      .set('category?', String(category))
      .set(' salary_type?', String(salary_type))
      .set('salary_currency?', String(salary_currency))
      .set('location_type?', String(location_type))
      .set('job_type?', String(job_type))
      .set('status?', String(status));
    return this.http.get<IJobs>(this.apiRoutesService.getRoute(API_ROUTES.JOBS.INDEX), {
      params,
    });
  }

  getJobs(page: number, count: number): Observable<IJobs> {
    const params = new HttpParams().set('page', String(page)).set('count', String(count));
    return this.http.get<IJobs>(this.apiRoutesService.getRoute(API_ROUTES.JOBS.INDEX), {
      params,
    });
  }
}
