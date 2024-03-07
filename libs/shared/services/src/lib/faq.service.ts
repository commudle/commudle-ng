import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IFaq, EDbModels } from '@commudle/shared-models';
import { Observable } from 'rxjs';
import { API_ROUTES } from './api-routes.constant';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  constructor(private http: HttpClient, private baseApiService: BaseApiService) {}

  createFaq(formData, parentType: EDbModels, parentId): Observable<IFaq> {
    const params = new HttpParams().set('parent_id', parentId).set('parent_type', parentType);
    return this.http.post<IFaq>(
      this.baseApiService.getRoute(API_ROUTES.FAQ.CREATE),
      { faq: formData },
      {
        params,
      },
    );
  }

  updateFaq(formData, faqId, parentType: EDbModels, parentId): Observable<IFaq> {
    const params = new HttpParams().set('faq_id', faqId).set('parent_id', parentId).set('parent_type', parentType);
    return this.http.put<IFaq>(
      this.baseApiService.getRoute(API_ROUTES.FAQ.UPDATE),
      { faq: formData },
      {
        params,
      },
    );
  }

  indexFaqs(parentId: number | string, parentType: EDbModels): Observable<IFaq[]> {
    const params = new HttpParams().set('parent_id', parentId).set('parent_type', parentType);
    return this.http.get<IFaq[]>(this.baseApiService.getRoute(API_ROUTES.FAQ.INDEX), { params });
  }

  destroyFaq(faqId): Observable<boolean> {
    const params = new HttpParams().set('faq_id', faqId);
    return this.http.delete<boolean>(this.baseApiService.getRoute(API_ROUTES.FAQ.DELETE), { params });
  }

  // PUBLIC API
  pIndexFaqs(parentId: number | string, parentType: EDbModels): Observable<IFaq[]> {
    const params = new HttpParams().set('parent_id', parentId).set('parent_type', parentType);
    return this.http.get<IFaq[]>(this.baseApiService.getRoute(API_ROUTES.FAQ.PUBLIC.INDEX), { params });
  }
}
