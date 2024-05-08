import { Component, OnInit } from '@angular/core';
import { IListingPageHeader } from 'apps/shared-models/listing-page-header.model';
import { CmsService } from 'apps/shared-services/cms.service';

@Component({
  selector: 'commudle-experts-header',
  templateUrl: './experts-header.component.html',
  styleUrls: ['./experts-header.component.scss'],
})
export class ExpertsHeaderComponent implements OnInit {
  listingPageHeader: IListingPageHeader;
  richText: string;

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    this.getHeaderText();
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  getHeaderText() {
    this.cmsService.getDataBySlug('experts').subscribe((data) => {
      this.listingPageHeader = data;
      // console.log(this.listingPageHeader);
      this.richText = this.cmsService.getHtmlFromBlock(data);
      // console.log(this.richText);
    });
  }
}
