import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStaticAssets } from 'apps/shared-models/assets.model';
import { IStaticAsset } from 'apps/shared-models/assets.model';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminStaticAssetsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getAssets(page?: number, count?: number): Observable<IStaticAssets> {
    let params = new HttpParams();
    return this.http.get<IStaticAssets>(this.apiRoutesService.getRoute(API_ROUTES.STATIC_ASSETS.SHOW), { params });
  }

  createAsset(formData): Observable<IStaticAssets> {
    return this.http.post<IStaticAssets>(this.apiRoutesService.getRoute(API_ROUTES.STATIC_ASSETS.CREATE), formData);
  }

  getAssetById(assetId: number): Observable<IStaticAsset> {
    const params = new HttpParams().set('asset_id', String(assetId));

    return this.http.get<IStaticAsset>(this.apiRoutesService.getRoute(API_ROUTES.STATIC_ASSETS.SHOW), { params });
  }
}
