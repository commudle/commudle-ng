import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { ILab } from 'projects/shared-models/lab.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IAttachedFile } from 'projects/shared-models/attached-file.model';
import { ILabs } from 'projects/shared-models/labs.model';

@Injectable({
  providedIn: 'root'
})
export class SysAdminLabsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }

  getAll(page?, count?): Observable<ILabs> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }

    if (count) {
      params = params.append('count', count);
    }

    return this.http.get<ILabs>(
      this.apiRoutesService.getRoute(API_ROUTES.LABS.ADMIN.INDEX), {params}
    );
  }

  updatePublishStatus(labId, publishStatus): Observable<boolean> {
    return this.http.put<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.LABS.ADMIN.UPDATE_PUBLISH_STATUS), {
        lab_id: labId,
        publish_status: publishStatus
      }
    );
  }

}
