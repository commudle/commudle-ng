import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAttachedFile } from '@commudle/shared-models';
import { ILabStep } from '@commudle/shared-models';
import { ILab } from '@commudle/shared-models';
import { ILabs } from '@commudle/shared-models';
import { ITags } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LabsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getAll(): Observable<ILabs> {
    return this.http.get<ILabs>(this.apiRoutesService.getRoute(API_ROUTES.LABS.INDEX));
  }

  createLab(name): Observable<ILab> {
    return this.http.post<ILab>(this.apiRoutesService.getRoute(API_ROUTES.LABS.CREATE), {
      lab: {
        name: name,
      },
    });
  }

  updateLab(labId, data, autoSave): Observable<ILab> {
    return this.http.post<ILab>(this.apiRoutesService.getRoute(API_ROUTES.LABS.UPDATE), {
      lab: data,
      lab_id: labId,
      autosave: autoSave,
    });
  }

  getLab(labId): Observable<ILab> {
    const params = new HttpParams().set('lab_id', labId);
    return this.http.get<ILab>(this.apiRoutesService.getRoute(API_ROUTES.LABS.SHOW), { params });
  }

  updateHeaderImage(labId, headerImage): Observable<IAttachedFile> {
    const params = new HttpParams().set('lab_id', labId);
    return this.http.post<IAttachedFile>(
      this.apiRoutesService.getRoute(API_ROUTES.LABS.UPLOAD_HEADER_IMAGE),
      headerImage,
      { params },
    );
  }

  deleteHeaderImage(labId): Observable<boolean> {
    const params = new HttpParams().set('lab_id', labId);
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.LABS.DELETE_HEADER_IMAGE), { params });
  }

  uploadTextImage(labId, image): Observable<string> {
    const params = new HttpParams().set('lab_id', labId);
    return this.http.post<string>(this.apiRoutesService.getRoute(API_ROUTES.LABS.UPLOAD_TEXT_IMAGE), image, { params });
  }

  destroy(labId): Observable<boolean> {
    const params = new HttpParams().set('lab_id', labId);
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.LABS.DELETE), { params });
  }

  updateTags(labId, tags): Observable<boolean> {
    return this.http.post<boolean>(this.apiRoutesService.getRoute(API_ROUTES.LABS.UPDATE_TAGS), {
      tags,
      lab_id: labId,
    });
  }

  addLabStepVisit(labStepId): Observable<boolean> {
    return this.http.post<boolean>(this.apiRoutesService.getRoute(API_ROUTES.LABS.ADD_LAB_STEP_VISIT), {
      lab_step_id: labStepId,
    });
  }

  pIndex(tag?: string): Observable<ILabs> {
    let params = new HttpParams();
    if (tag) {
      params = params.append('tag', tag);
    }
    return this.http.get<ILabs>(this.apiRoutesService.getRoute(API_ROUTES.LABS.PUBLIC.INDEX), { params });
  }

  pShow(labId): Observable<ILab> {
    const params = new HttpParams().set('lab_id', labId);
    return this.http.get<ILab>(this.apiRoutesService.getRoute(API_ROUTES.LABS.PUBLIC.SHOW), { params });
  }

  pTags(): Observable<ITags> {
    return this.http.get<ITags>(this.apiRoutesService.getRoute(API_ROUTES.LABS.PUBLIC.TAGS));
  }

  pGetStep(stepId): Observable<ILabStep> {
    const params = new HttpParams().set('lab_step_id', stepId);
    return this.http.get<ILabStep>(this.apiRoutesService.getRoute(API_ROUTES.LABS.PUBLIC.GET_STEPS), { params });
  }

  getSimilarLabs(labId): Observable<ILabs> {
    const params = new HttpParams().set('lab_id', labId);
    return this.http.get<ILabs>(this.apiRoutesService.getRoute(API_ROUTES.LABS.SIMILAR_LABS), { params });
  }

  searchTags(words: string[], page?: number, count?: number) {
    let params = new HttpParams();
    words.forEach((word: string) => (params = params.append('q[]', word)));
    if (page) {
      params = params.append('page', String(page));
    }
    if (count) {
      params = params.append('count', String(count));
    }
    return this.http.get<ITags>(this.apiRoutesService.getRoute(API_ROUTES.LABS.SEARCH.TAGS), { params });
  }

  searchLabsByTags(tags: string[], page?: number, count?: number) {
    let params = new HttpParams();
    tags.forEach((tag: string) => (params = params.append('tag_names[]', tag)));
    if (page) {
      params = params.append('page', String(page));
    }
    if (count) {
      params = params.append('count', String(count));
    }
    return this.http.get<ILabs>(this.apiRoutesService.getRoute(API_ROUTES.LABS.SEARCH.LABS_BY_TAGS), { params });
  }
}
