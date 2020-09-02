import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IUserEventRegistration } from 'projects/shared-models/user_event_registration.model';
import { IUsers } from 'projects/shared-models/users.model';
import { IUserEventRegistrations } from 'projects/shared-models/user_event_registrations.model';
import { IRegistrationStatus } from 'projects/shared-models/registration_status.model';

@Injectable({
  providedIn: 'root'
})
export class UserEventRegistrationsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  getRegistrations(eventId, registrationStatusId, query, page, count): Observable<IUserEventRegistrations> {
    const params = new HttpParams()
                        .set('event_id', eventId)
                        .set('registration_status_id', registrationStatusId)
                        .set('query', query)
                        .set('page', page)
                        .set('count', count);

    return this.http.get<IUserEventRegistrations>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_EVENT_REGISTRATIONS.INDEX), { params }
    );
  }


  updateRegistrationStatus(userEventRegistrationId, registrationStatusId): Observable<IRegistrationStatus> {
    return this.http.put<IRegistrationStatus>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_EVENT_REGISTRATIONS.UPDATE_REGISTRATION_STATUS), {
        user_event_registration_id: userEventRegistrationId,
        registration_status_id: registrationStatusId
       }
    );
  }

  inviteAsSpeaker(eventId, email): Observable<IUserEventRegistration> {
    return this.http.post<IUserEventRegistration>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_EVENT_REGISTRATIONS.INVITE_AS_SPEAKER), {
        event_id: eventId,
        email: email
       }
    );
  }

  speakers(eventId): Observable<IUserEventRegistrations> {
    let params = new HttpParams().set('event_id', eventId);

    return this.http.get<IUserEventRegistrations>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_EVENT_REGISTRATIONS.SPEAKERS), { params }
    );
  }

  removeSpeaker(userEventRegistrationId): Observable<any> {
    let params = new HttpParams().set('user_event_registration_id', userEventRegistrationId);

    return this.http.delete<any>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_EVENT_REGISTRATIONS.REMOVE_SPEAKER), { params }
    );
  }

  resendSpeakerInvitation(userEventRegistrationId): Observable<boolean> {
    let params = new HttpParams().set('user_event_registration_id', userEventRegistrationId);

    return this.http.post<boolean>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_EVENT_REGISTRATIONS.RESEND_SPEAKER_INVITATION), {}, { params }
    );
  }



  pShow(eventId): Observable<IUserEventRegistration> {
    const params = new HttpParams().set('event_id', eventId);

    return this.http.get<IUserEventRegistration>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_EVENT_REGISTRATIONS.PUBLIC.SHOW), { params }
    );
  }

  pToggle(eventSimpleRegistrationId): Observable<IUserEventRegistration> {
    return this.http.put<IUserEventRegistration>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_EVENT_REGISTRATIONS.PUBLIC.TOGGLE), {
        event_simple_registration_id: eventSimpleRegistrationId
       }
    );
  }


  pEventInterestedUsers(eventId): Observable<IUsers> {
    const params = new HttpParams().set('event_id', eventId);

    return this.http.get<IUsers>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_EVENT_REGISTRATIONS.PUBLIC.INTERESTED_MEMBERS), { params }
    );
  }

  pSpeakers(eventId): Observable<IUserEventRegistrations> {
    let params = new HttpParams().set('event_id', eventId);

    return this.http.get<IUserEventRegistrations>(
      this.apiRoutesService.getRoute(API_ROUTES.USER_EVENT_REGISTRATIONS.PUBLIC.SPEAKERS), { params }
    );
  }




}
