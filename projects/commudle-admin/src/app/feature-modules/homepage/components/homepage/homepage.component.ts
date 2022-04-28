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
    this.searchStatusService.setSearchStatus(false);

    this.getHomepageActions();

    this.seoService.setTags(
      'Commudle - Connect & Learn With Software Developers',
      'A community platform for software developers to connect over online events, channels, share knowledge & find jobs. Join now to build your "Developer Network".',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }

  ngOnDestroy(): void {
    this.searchStatusService.setSearchStatus(true);
  }

  getHomepageActions() {
    this.cmsService.getDataByType('homepageActions').subscribe((value: IHomepageAction[]) => {
      this.homepageActions = value;
    });
  }
}
