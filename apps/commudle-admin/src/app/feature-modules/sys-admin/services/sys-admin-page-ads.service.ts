import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPageAd } from '@commudle/shared-models';
import { IPageAds } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from '@commudle/shared-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SysAdminPageAdsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) {
  }

  getAllAds(page?: number, count?: number): Observable<IPageAds> {
    let params = new HttpParams();

    if (page) {
      params = params.append('page', String(page));
    }
    if (count) {
      params = params.append('count', String(count));
    }

    return this.http.get<IPageAds>(
      this.apiRoutesService.getRoute(API_ROUTES.PAGE_ADS.INDEX), { params }
    );
  }

  getAdById(pageAdId: number): Observable<IPageAd> {
    const params = new HttpParams().set('page_ad_id', String(pageAdId));

    return this.http.get<IPageAd>(
      this.apiRoutesService.getRoute(API_ROUTES.PAGE_ADS.SHOW), { params }
    );
  }

  createAd(formData): Observable<IPageAd> {
    return this.http.post<IPageAd>(
      this.apiRoutesService.getRoute(API_ROUTES.PAGE_ADS.CREATE), formData
    );
  }

  updateAd(formData, pageAdId: number): Observable<IPageAd> {
    const params = new HttpParams().set('page_ad_id', String(pageAdId));

    return this.http.put<IPageAd>(
      this.apiRoutesService.getRoute(API_ROUTES.PAGE_ADS.UPDATE), formData, { params }
    );
  }

  deleteAd(pageAdId: number): Observable<boolean> {
    const params = new HttpParams().set('page_ad_id', String(pageAdId));

    return this.http.delete<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.PAGE_ADS.UPDATE), { params }
    );
  }

}
