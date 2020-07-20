import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { ILab } from 'projects/shared-models/lab.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';

@Injectable({
  providedIn: 'root'
})
export class LabsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  createLab(name): Observable<ILab> {
    return this.http.post<ILab>(
      this.apiRoutesService.getRoute(API_ROUTES.LABS.CREATE),
      {
        lab: {
          name: name
        }
      }
    );
  }


  getLab(labId): Observable<ILab> {
    const params = new HttpParams().set('lab_id', labId);
    return this.http.post<ILab>(
      this.apiRoutesService.getRoute(API_ROUTES.LABS.SHOW), {params}
    );
  }
}
