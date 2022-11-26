import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IJob } from 'apps/shared-models/job.model';
import { IJobs } from 'apps/shared-models/jobs.model';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getJobs({ after, limit = 10, ...filters }: { after?: string; limit: number; [key: string]: any }): Observable<IJobs> {
    let params = new HttpParams().set('after', after || '').set('limit', String(limit));

    Object.keys(filters).forEach((key) => (params = params.set(key, filters[key])));

    return this.http.get<IJobs>(this.apiRoutesService.getRoute(API_ROUTES.JOBS.INDEX), { params });
  }

  // getJobs(
  //   after?: string,
  //   limit: number = 10,
  //   user_id?: number,
  //   category?: EJobCategory,
  //   salary_type?: EJobSalaryType,
  //   salary_currency?: EJobSalaryCurrency,
  //   location_type?: EJobLocationType,
  //   job_type?: EJobType,
  //   status?: EJobStatus,
  // ): Observable<IJobs> {
  //   let params = new HttpParams()
  //     .set('after', after || '')
  //     .set('limit', String(limit))
  //     .set('category', category || '')
  //     .set('salary_type', salary_type || '')
  //     .set('salary_currency', salary_currency || '')
  //     .set('location_type', location_type || '')
  //     .set('job_type', job_type || '')
  //     .set('status', status || '');
  //
  //   if (user_id) {
  //     params = params.set('user_id', String(user_id));
  //   }
  //
  //   return this.http.get<IJobs>(this.apiRoutesService.getRoute(API_ROUTES.JOBS.INDEX), { params });
  // }

  getJob(id: number): Observable<IJob> {
    const params = new HttpParams().set('job_id', String(id));
    return this.http.get<IJob>(this.apiRoutesService.getRoute(API_ROUTES.JOBS.SHOW), { params });
  }

  createJob(job: Omit<IJob, 'id'>): Observable<IJob> {
    return this.http.post<IJob>(this.apiRoutesService.getRoute(API_ROUTES.JOBS.CREATE), { job });
  }

  updateJob(id: number, job: Omit<IJob, 'id'>): Observable<IJob> {
    const params = new HttpParams().set('job_id', String(id));
    return this.http.put<IJob>(this.apiRoutesService.getRoute(API_ROUTES.JOBS.UPDATE), { job }, { params });
  }

  deleteJob(id: number): Observable<boolean> {
    const params = new HttpParams().set('job_id', String(id));
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.JOBS.DESTROY), { params });
  }
}
