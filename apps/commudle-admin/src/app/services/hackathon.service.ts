import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '@commudle/shared-services';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';
import { IHackathon } from 'apps/shared-models/hackathon.model';

@Injectable({
  providedIn: 'root',
})
export class HackathonService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  createHackathon(dataForm, parentId, parentType): Observable<IHackathon> {
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
    return this.http.post<IHackathon>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.CREATE),
      {
        hackathon: dataForm,
      },
      { params },
    );
  }

  updateHackathon(dataForm, hackathonId): Observable<IHackathon> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.put<IHackathon>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.UPDATE),
      {
        hackathon: dataForm,
      },
      { params },
    );
  }

  indexHackathons(parentId, parentType: string): Observable<IHackathon[]> {
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
    return this.http.get<IHackathon[]>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.INDEX), { params });
  }

  showHackathon(hackathonId): Observable<IHackathon> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.get<IHackathon>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.SHOW), { params });
  }

  createHackathonContactInfo(formData, hackathonId) {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.post<any>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.CREATE_CONTACT_INFO),
      {
        contact_info: formData,
      },
      { params },
    );
  }

  updateHackathonContactInfo(formData, hackathonId) {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.put<any>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.UPDATE_CONTACT_INFO),
      {
        contact_info: formData,
      },
      { params },
    );
  }

  updateHackathonDates(dataForm, hackathonId): Observable<IHackathon> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.put<IHackathon>(
      this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.UPDATE_HACKATHON_DATE),
      {
        hackathon: dataForm,
      },
      { params },
    );
  }

  showHackathonContactInfo(hackathonId): Observable<any> {
    const params = new HttpParams().set('hackathon_id', hackathonId);
    return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.HACKATHONS.SHOW_CONTACT_INFO), { params });
  }
}
