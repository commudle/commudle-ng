import { Component } from '@angular/core';
import { ApiRoutesService } from 'projects/lib-api-routes/src/public-api';
import { environment } from '../environments/environment';
import { LibAuthwatchService } from 'projects/lib-authwatch/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Commudle | Admin';

  constructor(
    private apiRoutes: ApiRoutesService,
    private authWatchService: LibAuthwatchService

    ) {
    this.apiRoutes.setBaseUrl(environment.base_url);
    this.authWatchService.checkAlreadySignedIn().subscribe();
  }
}
