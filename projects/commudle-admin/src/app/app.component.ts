import { Component } from '@angular/core';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { environment } from '../environments/environment';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';

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
