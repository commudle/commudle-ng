import { Component, OnDestroy, OnInit } from '@angular/core';
import { IHomepageAction } from 'projects/commudle-admin/src/app/feature-modules/homepage/models/homepage-action.model';
import { SearchStatusService } from 'projects/commudle-admin/src/app/feature-modules/search/services/search-status.service';
import { CmsService } from 'projects/shared-services/cms.service';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  homepageActions: IHomepageAction[] = [];

  constructor(
    private seoService: SeoService,
    private searchStatusService: SearchStatusService,
    private cmsService: CmsService,
  ) {}

  ngOnInit(): void {
    this.seoService.noIndex(true);
    this.searchStatusService.setSearchStatus(false);

    this.getHomepageActions();
  }

  ngOnDestroy(): void {
    this.seoService.noIndex(false);
    this.searchStatusService.setSearchStatus(true);
  }

  getHomepageActions() {
    this.cmsService.getDataByType('homepageActions').subscribe((value: IHomepageAction[]) => {
      this.homepageActions = value;
    });
  }
}
