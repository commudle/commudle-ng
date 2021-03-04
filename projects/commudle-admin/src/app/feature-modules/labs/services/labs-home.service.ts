import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiRoutesService} from 'projects/shared-services/api-routes.service';

@Injectable({
  providedIn: 'root'
})
export class LabsHomeService {
  // behaviour subject for list of searched tagnames --> subscribed to by search bar (initialize by empty array of ITag)
  // behaviour subject for list of searched labs --> subscribed to by labs component (initialize by empty array of ILab)


  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) {
  }

  addSearchTag(tagName) {

    // update the list of searched labs through this

  }
  
}
