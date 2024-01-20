import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IFaq, EModelName } from '@commudle/shared-models';
import { Observable } from 'rxjs';
import { API_ROUTES } from './api-routes.constant';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  constructor(private http: HttpClient, private baseApiService: BaseApiService) {}

  createFaq(formData, parentType: EModelName, parentId): Observable<IFaq> {
    const params = new HttpParams().set('parent_id', parentId).set('parent_type', parentType);
    return this.http.post<IFaq>(
      this.baseApiService.getRoute(API_ROUTES.FAQ.CREATE),
      { faq: formData },
      {
        params,
      },
    );
  }

  indexFaqs(parentId: number | string, parentType: EModelName): Observable<IFaq[]> {
    console.log('all');
    const params = new HttpParams().set('parent_id', parentId).set('parent_type', parentType);
    return this.http.get<IFaq[]>(this.baseApiService.getRoute(API_ROUTES.FAQ.INDEX), { params });
  }

  destroyFaq(faqId): Observable<boolean> {
    const params = new HttpParams().set('faq_id', faqId);
    return this.http.delete<boolean>(this.baseApiService.getRoute(API_ROUTES.FAQ.DELETE), { params });
  }
}
