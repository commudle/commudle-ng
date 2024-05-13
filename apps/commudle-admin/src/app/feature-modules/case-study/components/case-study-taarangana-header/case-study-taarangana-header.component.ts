import { Component, OnInit } from '@angular/core';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { IListingPageHeader } from 'apps/shared-models/listing-page-header.model';
import { CmsService } from 'apps/shared-services/cms.service';

@Component({
  selector: 'commudle-case-study-taarangana-header',
  templateUrl: './case-study-taarangana-header.component.html',
  styleUrls: ['./case-study-taarangana-header.component.scss'],
})
export class CaseStudyTaaranganaHeaderComponent implements OnInit {
  caseStudyPageHeader: IListingPageHeader;
  richText: string;
  BackgroundImage;
  staticAssets = staticAssets;

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    this.getHeaderText();
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  getHeaderText() {
    this.cmsService.getDataBySlug('taarangana').subscribe((data) => {
      this.caseStudyPageHeader = data;
      console.log(this.caseStudyPageHeader);
      this.BackgroundImage = this.imageUrl(this.caseStudyPageHeader.header_image).url();
      console.log(this.BackgroundImage);
      // this.richText = this.cmsService.getHtmlFromBlock(data);
    });
  }
}
