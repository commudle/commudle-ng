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
export class LabsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }

  getAll(): Observable<ILabs> {
    return this.http.get<ILabs>(
      this.apiRoutesService.getRoute(API_ROUTES.LABS.INDEX)
    );
  }


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

  updateLab(labId, data): Observable<ILab> {
    return this.http.post<ILab>(
      this.apiRoutesService.getRoute(API_ROUTES.LABS.UPDATE),
      {
        lab: data,
        lab_id: labId
      }
    );
  }


  getLab(labId): Observable<ILab> {
    const params = new HttpParams().set('lab_id', labId);
    return this.http.get<ILab>(
      this.apiRoutesService.getRoute(API_ROUTES.LABS.SHOW), {params}
    );
  }



  updateHeaderImage(labId, headerImage): Observable<IAttachedFile> {
    const params = new HttpParams().set('lab_id', labId);
    return this.http.post<IAttachedFile>(
      this.apiRoutesService.getRoute(API_ROUTES.LABS.UPLOAD_HEADER_IMAGE),
      headerImage,
      {params}
    );
  }

  deleteHeaderImage(labId): Observable<boolean> {
    const params = new HttpParams().set('lab_id', labId);
    return this.http.delete<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.LABS.DELETE_HEADER_IMAGE),
      {params}
    );
  }

  uploadTextImage(labId, image): Observable<string> {
    const params = new HttpParams().set('lab_id', labId);
    return this.http.post<string>(
      this.apiRoutesService.getRoute(API_ROUTES.LABS.UPLOAD_TEXT_IMAGE),
      image,
      {params}
    );
  }

  destroy(labId): Observable<boolean> {
    const params = new HttpParams().set('lab_id', labId);
    return this.http.delete<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.LABS.DELETE), {params}
    );
  }


  updateTags(labId, tags): Observable<boolean> {
    const params = new HttpParams().set('lab_id', labId);
    return this.http.post<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.LABS.UPDATE_TAGS),
      {tags, lab_id: labId}
    );
  }


  pShow(labId): Observable<ILab> {
    const params = new HttpParams().set('lab_id', labId);
    return this.http.get<ILab>(
      this.apiRoutesService.getRoute(API_ROUTES.LABS.PUBLIC.SHOW), {params}
    );
  }
}
