import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ITrackSlot } from 'projects/shared-models/track-slot.model';


@Injectable({
  providedIn: 'root'
})
export class TrackSlotsService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }


  createTrackSlot(newTrackSlot): Observable<ITrackSlot> {

    return this.http.post<ITrackSlot>(
      this.apiRoutesService.getRoute(API_ROUTES.CREATE_TRACK_SLOT),
      {
        track_slot: newTrackSlot
      }
    );
  }

  updateTrackSlot(trackSlot, trackSlotId): Observable<ITrackSlot> {

    return this.http.patch<ITrackSlot>(
      this.apiRoutesService.getRoute(API_ROUTES.UPDATE_TRACK_SLOT),
      {
        track_slot: trackSlot,
        track_slot_id: trackSlotId
      }
    );
  }


  deleteTrackSlot(trackSlotId): Observable<any> {
    let params = new HttpParams().set('track_slot_id', trackSlotId);
    return this.http.delete<any>(
      this.apiRoutesService.getRoute(API_ROUTES.DELETE_TRACK_SLOT), { params }
    );
  }


}
