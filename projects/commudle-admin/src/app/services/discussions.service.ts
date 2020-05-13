import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { IDiscussion } from 'projects/shared-models/discussion.model';

@Injectable({
  providedIn: 'root'
})
export class DiscussionsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  getOrCreateByTrackSlot(trackSlotId): Observable<IDiscussion> {
    const params = new HttpParams().set('track_slot_id', trackSlotId);
    return this.http.get<IDiscussion>(
      this.apiRoutesService.getRoute(API_ROUTES.DISCUSSIONS.GET_OR_CREATE_BY_TRACK_SLOT),
      { params }
    );
  }



}
