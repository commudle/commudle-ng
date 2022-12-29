import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { SeoService } from 'apps/shared-services/seo.service';
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
  ) {}

  ngOnInit() {
    this.seoService.noIndex(true);

    this.authWatchService.signOut().subscribe(() => {
      this.document.location.href = '/';
      this.gtm.dataLayerPushEvent('logout', {});
    });
  }

  ngOnDestroy(): void {
    this.seoService.noIndex(false);
  }
}
