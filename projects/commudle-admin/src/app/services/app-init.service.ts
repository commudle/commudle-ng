import { Injectable } from '@angular/core';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class AppInitService {
  constructor(private apiRoutesService: ApiRoutesService, private authWatchService: LibAuthwatchService) {}

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.apiRoutesService.getBaseUrl()) {
        this.apiRoutesService.setBaseUrl(environment.base_url);
      }
      this.authWatchService.checkAlreadySignedIn().subscribe();
      resolve(null);
    });
  }
}
