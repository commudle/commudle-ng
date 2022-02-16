import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchStatusService } from 'projects/commudle-admin/src/app/feature-modules/search/services/search-status.service';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  constructor(private seoService: SeoService, private searchStatusService: SearchStatusService) {}

  ngOnInit(): void {
    this.seoService.noIndex(true);
    this.searchStatusService.setSearchStatus(false);
  }

  ngOnDestroy(): void {
    this.seoService.noIndex(false);
    this.searchStatusService.setSearchStatus(true);
  }
}
