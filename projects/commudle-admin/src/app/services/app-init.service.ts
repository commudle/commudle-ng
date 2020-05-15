import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AppInitService {

  constructor(
    private apiRoutesService: ApiRoutesService
  ) { }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.apiRoutesService.getBaseUrl()) {
        this.apiRoutesService.setBaseUrl(environment.base_url);
      }
      resolve();
    });
  }

}
