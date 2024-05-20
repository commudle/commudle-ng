import { Component, OnInit } from '@angular/core';
import { IListingPageHeader } from 'apps/shared-models/listing-page-header.model';
import { CmsService } from 'apps/shared-services/cms.service';

@Component({
  selector: 'commudle-case-studies-header',
  templateUrl: './case-studies-header.component.html',
  styleUrls: ['./case-studies-header.component.scss'],
})
export class CaseStudiesHeaderComponent implements OnInit {
  communitiesPageHeader: IListingPageHeader;

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    this.getHeaderText();
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  getHeaderText() {
    this.cmsService.getDataBySlug('case-study').subscribe((data) => {
      this.communitiesPageHeader = data;
    });
  }
}
