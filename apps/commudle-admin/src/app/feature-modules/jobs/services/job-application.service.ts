import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EJobApplicationStatus, IJobApplication } from 'apps/shared-models/job-application.model';
import { IJobApplications } from 'apps/shared-models/job-applications.model';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getJobApplications(job_id: number, page: number, count: number): Observable<IJobApplications> {
    const params = new HttpParams().set('page', String(page)).set('count', String(count)).set('job_id', String(job_id));
    return this.http.get<IJobApplications>(this.apiRoutesService.getRoute(API_ROUTES.JOB_APPLICATIONS.INDEX), {
      params,
    });
  }

  getMyJobApplications(): Observable<IJobApplications> {
    return this.http.get<IJobApplications>(this.apiRoutesService.getRoute(API_ROUTES.JOB_APPLICATIONS.MY_APPLICATIONS));
  }

  createJobApplication(job_id: number, user_resume_id: number): Observable<IJobApplication> {
    return this.http.post<IJobApplication>(this.apiRoutesService.getRoute(API_ROUTES.JOB_APPLICATIONS.CREATE), {
      job_id,
      user_resume_id,
    });
  }

  updateJobApplication(
    job_application_id: number,
    job_application: Omit<IJobApplication, 'id'>,
  ): Observable<IJobApplication> {
    const params = new HttpParams().set('job_application_id', String(job_application_id));
    return this.http.put<IJobApplication>(
      this.apiRoutesService.getRoute(API_ROUTES.JOB_APPLICATIONS.UPDATE),
      { job_application },
      { params },
    );
  }

  updateJobApplicationStatus(job_application_id: number, status: EJobApplicationStatus): Observable<IJobApplication> {
    const params = new HttpParams().set('job_application_id', String(job_application_id));
    return this.http.post<IJobApplication>(
      this.apiRoutesService.getRoute(API_ROUTES.JOB_APPLICATIONS.UPDATE_STATUS),
      { job_application: { status } },
      { params },
    );
  }

  deleteJobApplication(job_application_id: number): Observable<boolean> {
    const params = new HttpParams().set('job_application_id', String(job_application_id));
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.JOB_APPLICATIONS.DESTROY), { params });
  }
}
