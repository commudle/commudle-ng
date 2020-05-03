import { Component, Inject } from '@angular/core';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { environment } from '../environments/environment';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { NbSidebarService } from '@nebular/theme';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faBars = faBars;
  currentUser: ICurrentUser;
  userContextMenu = [
    { title: 'Logout', link: '/logout' },
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private apiRoutes: ApiRoutesService,
    private authWatchService: LibAuthwatchService,
    private sidebarService: NbSidebarService,
    private titleService: Title,
    private router: Router
    ) {

      this.titleService.setTitle("Commudle | Communities | Let's Share & Learn");
      this.apiRoutes.setBaseUrl(environment.base_url);
      this.authWatchService.checkAlreadySignedIn().subscribe();
      this.authWatchService.currentUser$.subscribe(currentUser => this.currentUser = currentUser);
  }


  toggleSidebar() {
    this.sidebarService.toggle(false, 'left');
  }

  login() {
    this.document.location.href = `https://auther.commudle.com/?back_to=${encodeURIComponent(window.location.href)}`;
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }
}
