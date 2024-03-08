import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HackathonJudgeService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  resendJudgeInvite(HackathonJudgeId): Observable<boolean> {
    return this.http.put<boolean>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_JUDGE.RESEND_INVITE), {
      hackathon_judge_id: HackathonJudgeId,
    });
  }
}
