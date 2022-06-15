import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { assets } from 'projects/shared-models/assets.model';
import { static_assets } from 'projects/shared-models/assets.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminStaticAssetsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getAsset(page?: number, count?: number): Observable<assets> {
    let params = new HttpParams();
    return this.http.get<assets>(this.apiRoutesService.getRoute(API_ROUTES.STATIC_ASSETS.SHOW), { params });
  }
  createAsset(formData): Observable<assets> {
    return this.http.post<assets>(this.apiRoutesService.getRoute(API_ROUTES.STATIC_ASSETS.CREATE), formData);
  }
  getAssetById(AssetId: number): Observable<static_assets> {
    const params = new HttpParams().set('asset_id', String(AssetId));

    return this.http.get<static_assets>(this.apiRoutesService.getRoute(API_ROUTES.STATIC_ASSETS.SHOW), { params });
  }
}
