import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserWorkHistory } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserWorkHistoryService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getWorkHistories(userId: number): Observable<IUserWorkHistory[]> {
    let params = new HttpParams().set('user_id', String(userId));
    return this.http.get<IUserWorkHistory[]>(this.apiRoutesService.getRoute(API_ROUTES.USER_WORK_HISTORY.INDEX), {
      params,
    });
  }

  createWorkHistory(workHistory: Omit<IUserWorkHistory, 'id'>): Observable<IUserWorkHistory> {
    return this.http.post<IUserWorkHistory>(this.apiRoutesService.getRoute(API_ROUTES.USER_WORK_HISTORY.CREATE), {
      user_work_history: workHistory,
    });
  }

  updateWorkHistory(
    userWorkHistoryId: number,
    workHistory: Omit<IUserWorkHistory, 'id'>,
  ): Observable<IUserWorkHistory> {
    let params = new HttpParams().set('user_work_history_id', String(userWorkHistoryId));
    return this.http.put<IUserWorkHistory>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_WORK_HISTORY.UPDATE),
      { user_work_history: workHistory },
      { params },
    );
  }

  deleteWorkHistory(userWorkHistoryId: number): Observable<boolean> {
    let params = new HttpParams().set('user_work_history_id', String(userWorkHistoryId));
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.USER_WORK_HISTORY.DESTROY), { params });
  }
}
