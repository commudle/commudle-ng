import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';
import { INewsletter } from 'apps/shared-models/newsletter.model';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  createNewNewsletter(newsletter, parentId, parentType): Observable<any> {
    let params = new HttpParams();
    switch (parentType) {
      case 'Kommunity': {
        params = params.set('community_id', parentId);
        break;
      }
      case 'CommunityGroup': {
        params = params.set('community_group_id', parentId);
        break;
      }
    }
    return this.http.post<any>(this.apiRoutesService.getRoute(API_ROUTES.NEWSLETTER.CREATE), newsletter, { params });
  }

  getIndex(parentId: number | string, parentType: string): Observable<INewsletter[]> {
    let params = new HttpParams();
    switch (parentType) {
      case 'Kommunity': {
        params = params.set('community_id', parentId);
        break;
      }
      case 'CommunityGroup': {
        params = params.set('community_group_id', parentId);
        break;
      }
    }
    return this.http.get<INewsletter[]>(this.apiRoutesService.getRoute(API_ROUTES.NEWSLETTER.INDEX), { params });
  }

  update(dataForm, newsletterId): Observable<INewsletter> {
    return this.http.put<INewsletter>(this.apiRoutesService.getRoute(API_ROUTES.NEWSLETTER.UPDATE), {
      newsletter_id: newsletterId,
      newsletter: dataForm,
    });
  }

  togglePublished(published, newsletterId: number): Observable<INewsletter> {
    return this.http.put<INewsletter>(this.apiRoutesService.getRoute(API_ROUTES.NEWSLETTER.UPDATE), {
      newsletter_id: newsletterId,
      newsletter: {
        published: published,
      },
    });
  }

  getShow(newsletterId): Observable<INewsletter> {
    const params = new HttpParams().set('newsletter_id', newsletterId);
    return this.http.get<INewsletter>(this.apiRoutesService.getRoute(API_ROUTES.NEWSLETTER.SHOW), { params });
  }

  getPIndex(parentId: number | string, parentType?: string): Observable<INewsletter[]> {
    let params = new HttpParams();
    switch (parentType) {
      case 'Kommunity': {
        params = params.set('community_id', parentId);
        break;
      }
      case 'CommunityGroup': {
        params = params.set('community_group_id', parentId);
        break;
      }
    }
    return this.http.get<INewsletter[]>(this.apiRoutesService.getRoute(API_ROUTES.NEWSLETTER.PUBLIC.INDEX), {
      params,
    });
  }

  getPShow(newsletterId: number | string, parentId?, parentType?): Observable<INewsletter> {
    let params = new HttpParams().set('newsletter_id', newsletterId);
    switch (parentType) {
      case 'Kommunity': {
        params = params.set('community_id', parentId);
        break;
      }
      case 'CommunityGroup': {
        params = params.set('community_group_id', parentId);
        break;
      }
    }
    return this.http.get<INewsletter>(this.apiRoutesService.getRoute(API_ROUTES.NEWSLETTER.PUBLIC.SHOW), { params });
  }

  destroy(newsletterId: number): Observable<boolean> {
    const params = new HttpParams().set('newsletter_id', newsletterId);
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.NEWSLETTER.DELETE), { params });
  }

  setSchedule(newsletterId: number, schedule): Observable<boolean> {
    return this.http.post<boolean>(this.apiRoutesService.getRoute(API_ROUTES.NEWSLETTER.SET_SCHEDULE), {
      newsletter_id: newsletterId,
      schedule: schedule,
    });
  }

  resetSchedule(newsletterId: number): Observable<boolean> {
    const params = new HttpParams().set('newsletter_id', newsletterId);
    return this.http.delete<boolean>(this.apiRoutesService.getRoute(API_ROUTES.NEWSLETTER.RESET_SCHEDULE), { params });
  }
}
