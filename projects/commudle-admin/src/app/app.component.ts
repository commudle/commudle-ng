import { Component } from '@angular/core';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { environment } from '../environments/environment';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { NbSidebarService } from '@nebular/theme';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Commudle | Admin';
  faBars = faBars;
  rotateMenuIcon = 90;

  constructor(
    private apiRoutes: ApiRoutesService,
    private authWatchService: LibAuthwatchService,
    private sidebarService: NbSidebarService
    ) {
    this.apiRoutes.setBaseUrl(environment.base_url);
    this.authWatchService.checkAlreadySignedIn().subscribe();
  }


  toggleSidebar() {
    this.sidebarService.toggle(false, 'left');
    this.rotateMenuIcon = (this.rotateMenuIcon == 0 ? 90 : 0);
  }
}
