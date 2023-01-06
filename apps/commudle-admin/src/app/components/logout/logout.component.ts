import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { CookieService } from 'ngx-cookie-service';
import { GoogleTagManagerService } from '../../services/google-tag-manager.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authWatchService: LibAuthwatchService,
    private seoService: SeoService,
    private gtm: GoogleTagManagerService,
    private cookieService: CookieService,
  ) {}

  ngOnInit() {
    this.seoService.noIndex(true);

    this.authWatchService.signOut().subscribe(() => {
      this.gtm.dataLayerPushEvent('logout', {});
      this.document.location.href = '/';
      this.cookieService.delete(environment.auth_cookie_name, environment.app_url);
    });
  }

  ngOnDestroy(): void {
    this.seoService.noIndex(false);
  }
}
