import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILinkPreview } from '@commudle/shared-models';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from '@commudle/shared-services';
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
