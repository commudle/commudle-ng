import { IEmailStatsOverview } from './../../../../../../shared-models/email-stats-overview.model';
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
          main_newsletter: mainNewsletterData,
          main_newsletter_id: mainNewsletterId
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



  // schedule the emails
  setSchedule(mainNewsletterId, schedule, recipientType): Observable<boolean>{
    return this.http.put<boolean>(
        this.apiRoutesService.getRoute(API_ROUTES.MAIN_NEWSLETTERS.SET_SCHEDULE),
        {
          main_newsletter_id: mainNewsletterId,
          schedule,
          recipient_type: recipientType
        }
        );
  }

  // reset the email schedule
  resetSchedule(mainNewsletterId): Observable<boolean>{
    return this.http.put<boolean>(
        this.apiRoutesService.getRoute(API_ROUTES.MAIN_NEWSLETTERS.RESET_SCHEDULE),
        {
          main_newsletter_id: mainNewsletterId,
        }
        );
  }



  // send test email
  sendTestEmail(mainNewsletterId, emails): Observable<boolean>{
    return this.http.post<boolean>(
        this.apiRoutesService.getRoute(API_ROUTES.MAIN_NEWSLETTERS.SEND_TEST_EMAIL),
        {
          main_newsletter_id: mainNewsletterId,
          emails
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
  adminIndex(page, count): Observable<IMainNewsletters>{
    let params = new HttpParams().set('page', page).set('count', count);
    return this.http.get<IMainNewsletters>(
        this.apiRoutesService.getRoute(API_ROUTES.MAIN_NEWSLETTERS.ADMIN.INDEX), {params}
        );
  }


  // email stats
  emailStats(mainNewsletterId): Observable<IEmailStatsOverview>{
    let params = new HttpParams().set('main_newsletter_id', mainNewsletterId);
    return this.http.get<IEmailStatsOverview>(
        this.apiRoutesService.getRoute(API_ROUTES.MAIN_NEWSLETTERS.EMAIL_STATS), {params}
        );
  }

}
