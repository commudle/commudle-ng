import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { IEventAttendees } from 'apps/shared-models/event-attendees';
import { IFixedEmails } from 'apps/shared-models/fixed-emails.model';
import { IStat } from 'apps/shared-models/stats/stat.model';
import { IMembersWorkExperience } from 'apps/shared-models/stats/members-work-experience.model';
import { ITagsDistribution } from 'apps/shared-models/stats/tags-distribution.model';
import { IContentCreators } from 'apps/shared-models/stats/content-creators.model';
import { ISpeakers } from 'apps/shared-models/stats/speaker.model';

@Injectable({
  providedIn: 'root',
})
export class StatsCommunitiesService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  membersDistribution(communityId): Observable<any> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.STATS.COMMUNITIES.MEMBERS_DISTRIBUTION), {
      params,
    });
  }

  membersTimeline(communityId): Observable<any> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.STATS.COMMUNITIES.MEMBERS_TIMELINE), {
      params,
    });
  }

  eventsTimeLine(communityId): Observable<any> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.STATS.COMMUNITIES.EVENTS_TIMELINE), { params });
  }

  emails(communityId): Observable<IFixedEmails> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<IFixedEmails>(this.apiRoutesService.getRoute(API_ROUTES.STATS.COMMUNITIES.EMAILS), { params });
  }

  popularProfileSkillTags(communityId): Observable<IStat<ITagsDistribution>> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<IStat<ITagsDistribution>>(
      this.apiRoutesService.getRoute(API_ROUTES.STATS.COMMUNITIES.POPULAR_PROFILE_SKILL_TAGS),
      {
        params,
      },
    );
  }

  membersWorkExperienceDistribution(communityId): Observable<IStat<IMembersWorkExperience>> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<IStat<IMembersWorkExperience>>(
      this.apiRoutesService.getRoute(API_ROUTES.STATS.COMMUNITIES.MEMBERS_WORK_EXPERIENCE_DISTRIBUTION),
      {
        params,
      },
    );
  }

  speakersDistribution(communityId): Observable<IStat<ISpeakers>> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<IStat<ISpeakers>>(
      this.apiRoutesService.getRoute(API_ROUTES.STATS.COMMUNITIES.SPEAKERS_DISTRIBUTION),
      {
        params,
      },
    );
  }

  membersContentCreators(communityId): Observable<IStat<IContentCreators>> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.STATS.COMMUNITIES.MEMBERS_CONTENT_CREATORS), {
      params,
    });
  }

  eventAttendanceStats(communityId): Observable<IStat<IEventAttendees>> {
    const params = new HttpParams().set('community_id', communityId);
    return this.http.get<IStat<IEventAttendees>>(
      this.apiRoutesService.getRoute(API_ROUTES.STATS.COMMUNITIES.EVENT_ATTENDANCE_STATS),
      {
        params,
      },
    );
  }
}
