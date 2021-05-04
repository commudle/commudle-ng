import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMainNewsletter } from 'projects/shared-models/main-newsletter.model';
import { IMainNewsletters } from 'projects/shared-models/main-newsletters.model';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';

@Injectable({
  providedIn: 'root'
})
export class MainNewslettersService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }

  // create a newsletter
  create(mainNewsletterData): Observable<IMainNewsletter>{
    return this.http.post<IMainNewsletter>(
        this.apiRoutesService.getRoute(API_ROUTES.MAIN_NEWSLETTERS.CREATE),
        {
          main_newsletter: mainNewsletterData
        }
        );
  }

  // get details of a newsletter
  show(mainNewsletterId): Observable<IMainNewsletter>{
    let params = new HttpParams().set('main_newsletter_id', mainNewsletterId)
    return this.http.get<IMainNewsletter>(
        this.apiRoutesService.getRoute(API_ROUTES.MAIN_NEWSLETTERS.SHOW),
        {params}
        );
  }

  // update
  update(mainNewsletterData, mainNewsletterId): Observable<IMainNewsletter>{
    return this.http.put<IMainNewsletter>(
        this.apiRoutesService.getRoute(API_ROUTES.MAIN_NEWSLETTERS.UPDATE),
        {
          main_newsletter: mainNewsletterData
        }
        );
  }


  // update status
  updateStatus(mainNewsletterId, status): Observable<boolean>{
    return this.http.put<boolean>(
        this.apiRoutesService.getRoute(API_ROUTES.MAIN_NEWSLETTERS.UPDATE_STATUS),
        {
          main_newsletter_id: mainNewsletterId,
          status
        }
        );
  }


  // delete a newsletter
  delete(mainNewsletterId): Observable<boolean>{
    let params = new HttpParams().set('main_newsletter_id', mainNewsletterId)
    return this.http.delete<boolean>(
        this.apiRoutesService.getRoute(API_ROUTES.MAIN_NEWSLETTERS.DELETE),
        {
          params
        }
        );
  }


  // attach image
  attachImage(mainNewsletterId, image): Observable<boolean>{
    let params = new HttpParams().set('main_newsletter_id', mainNewsletterId)
    return this.http.put<boolean>(
        this.apiRoutesService.getRoute(API_ROUTES.MAIN_NEWSLETTERS.ATTACH_TEXT_IMAGE),
        image,
        {
          params
        },
        );
  }


  // admin index
  adminIndex(): Observable<IMainNewsletters>{
    return this.http.get<IMainNewsletters>(
        this.apiRoutesService.getRoute(API_ROUTES.MAIN_NEWSLETTERS.ADMIN.INDEX),
        );
  }

}
