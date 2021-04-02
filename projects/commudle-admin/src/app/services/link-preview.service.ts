import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILinkPreview } from 'projects/shared-models/link-preview.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkPreviewService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }

  // get the preview to any link
  getPreview(url): Observable<ILinkPreview> {
    return this.http.post<ILinkPreview>(
      this.apiRoutesService.getRoute(API_ROUTES.LINK_PREVIEWS.CREATE), {url}
    )
  }
}
