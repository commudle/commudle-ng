import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IJob } from 'projects/shared-models/job.model';
import { IJobs } from 'projects/shared-models/jobs.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getJobs(page: number, count: number, user_id: number): Observable<IJobs> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('count', String(count))
      .set('user_id', String(user_id));
    return this.http.get<IJobs>(this.apiRoutesService.getRoute(API_ROUTES.JOBS.INDEX), { params });
  }

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
