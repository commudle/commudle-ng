import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPageAd } from 'projects/shared-models/page-ad.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageAdsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getActiveAd(slot: string, defaultAd: boolean = false): Observable<IPageAd> {
    let params = new HttpParams().set('slot', slot);
    if (defaultAd) {
      params = params.set('is_default', String(defaultAd));
    }

    return this.http.get<IPageAd>(this.apiRoutesService.getRoute(API_ROUTES.PAGE_ADS.PUBLIC.SHOW), { params });
  }
}
