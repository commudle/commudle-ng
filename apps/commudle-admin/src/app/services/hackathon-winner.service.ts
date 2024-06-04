import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHackathonWinner } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HackathonWinnerService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  addHackathonWinner(hackathonPrizeId, hackathonTeamId): Observable<IHackathonWinner> {
    return this.http.post<IHackathonWinner>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_WINNER.ADD_WINNER), {
      hackathon_prize_id: hackathonPrizeId,
      hackathon_team_id: hackathonTeamId,
    });
  }

  removeHackathonWinner(hackathonWinnerId): Observable<boolean> {
    const params = new HttpParams().set('hackathon_winner_id', hackathonWinnerId);
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHON_WINNER.REMOVE_WINNER), {
      params,
    });
  }
}
