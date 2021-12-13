import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILab } from 'projects/shared-models/lab.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getRecommendedLabs(): Observable<ILab[]> {
    return this.http.get<ILab[]>(this.apiRoutesService.getRoute(API_ROUTES.RECOMMENDATIONS.LABS));
  }
}
