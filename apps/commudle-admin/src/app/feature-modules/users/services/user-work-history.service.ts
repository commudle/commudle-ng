import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserWorkHistory } from 'apps/shared-models/user_work_history.model';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserWorkHistoryService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getWorkHistories(userId: number): Observable<IUserWorkHistory[]> {
    const params = new HttpParams().set('user_id', String(userId));
    return this.http.get<IUserWorkHistory[]>(this.apiRoutesService.getRoute(API_ROUTES.USER_WORK_HISTORY.INDEX), {
      params,
    });
  }

  createWorkHistory(
    workHistory: Partial<{
      job_title: string;
      company: string;
      location: string;
      start_date: string;
      end_date: string;
      is_working: boolean;
      description: string;
    }>,
  ): Observable<IUserWorkHistory> {
    return this.http.post<IUserWorkHistory>(this.apiRoutesService.getRoute(API_ROUTES.USER_WORK_HISTORY.CREATE), {
      user_work_history: workHistory,
    });
  }

  updateWorkHistory(
    userWorkHistoryId: number,
    workHistory: Partial<{
      job_title: string;
      company: string;
      location: string;
      start_date: string;
      end_date: string;
      is_working: boolean;
      description: string;
    }>,
  ): Observable<IUserWorkHistory> {
    const params = new HttpParams().set('user_work_history_id', String(userWorkHistoryId));
    return this.http.put<IUserWorkHistory>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_WORK_HISTORY.UPDATE),
      { user_work_history: workHistory },
      { params },
    );
  }

  deleteWorkHistory(userWorkHistoryId: number): Observable<boolean> {
    const params = new HttpParams().set('user_work_history_id', String(userWorkHistoryId));
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.USER_WORK_HISTORY.DESTROY), { params });
  }
}
