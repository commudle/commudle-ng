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
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';
import { NbIconLibraries } from '@nebular/theme';


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
    private actionCableConnectionSocket: ActionCableConnectionSocket,
    private sidebarService: NbSidebarService,
    private titleService: Title,
    private router: Router,
    // to register font awesome in nb-icon
    // private iconLibraries: NbIconLibraries
    ) {
      this.apiRoutes.setBaseUrl(environment.base_url);
      this.actionCableConnectionSocket.setBaseUrl(environment.action_cable_url);
      this.titleService.setTitle("Commudle | Communities | Let's Share & Learn");
      this.authWatchService.currentUser$.subscribe(currentUser => {
        this.currentUser = currentUser;
        this.actionCableConnectionSocket.connectToServer();
      });
      // this.iconLibraries.registerFontPack('solid', {packClass: 'fas', iconClassPrefix: 'fa'});
      // this.iconLibraries.registerFontPack('regular', {packClass: 'far', iconClassPrefix: 'fa'});
      // this.iconLibraries.registerFontPack('light', {packClass: 'fal', iconClassPrefix: 'fa'});
      // this.iconLibraries.registerFontPack('duotone', {packClass: 'fad', iconClassPrefix: 'fa'});
      // this.iconLibraries.registerFontPack('brands', {packClass: 'fab', iconClassPrefix: 'fa'});

      this.router.events.subscribe(event => {
        setTimeout(() => {
                if (window.screen.width <= 1000 && document.getElementById("commudleSidebar").classList.contains('expanded') ){
                  // remove expanded class
                  document.getElementById("commudleSidebar").classList.remove('expanded');
                  // add collaapsed class
                  document.getElementById("commudleSidebar").classList.add('collapsed');
                }
                if (window.screen.width >= 1000)  {
                  this.sidebarService.expand();
                }
            }, 10);
      });
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
