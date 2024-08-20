import { Component, OnInit } from '@angular/core';
import { CmsService } from 'apps/shared-services/cms.service';
import { IListingPageHeader } from 'apps/shared-models/listing-page-header.model';

@Component({
  selector: 'app-communities-about',
  templateUrl: './communities-about.component.html',
  styleUrls: ['./communities-about.component.scss'],
})
export class CommunitiesAboutComponent implements OnInit {
  communitiesPageHeader: IListingPageHeader;
  richText: string;

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    this.getHeaderText();
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  getHeaderText() {
    this.cmsService.getDataBySlug('communities').subscribe((data) => {
      this.communitiesPageHeader = data;
      this.richText = this.cmsService.getHtmlFromBlock(data);
    });
  }
}
