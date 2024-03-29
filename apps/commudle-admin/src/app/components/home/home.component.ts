import { Component, OnDestroy, OnInit } from '@angular/core';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setTags(
      'Commudle - Connect & Learn With Software Developers',
      'A community platform for software developers to connect over online events, channels, share knowledge & find jobs. Join now to build your "Developer Network".',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
    this.seoService.noIndex(true);
  }

  ngOnDestroy(): void {
    this.seoService.noIndex(false);
  }
}
