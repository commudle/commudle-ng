import { Injectable } from '@angular/core';
import { environment } from '@commudle/shared-environments';
import { ApiRoutesService, LibAuthwatchService } from '@commudle/shared-services';

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
