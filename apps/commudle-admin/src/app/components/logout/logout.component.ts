import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { LibAuthwatchService } from '@commudle/shared-services';
import { SeoService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authWatchService: LibAuthwatchService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.seoService.noIndex(true);

    this.authWatchService.signOut().subscribe(() => (this.document.location.href = '/'));
  }

  ngOnDestroy(): void {
    this.seoService.noIndex(false);
  }
}
