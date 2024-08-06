import { Component, OnInit } from '@angular/core';
import { IListingPageHeader } from 'apps/shared-models/listing-page-header.model';
import { CmsService } from 'apps/shared-services/cms.service';

@Component({
  selector: 'commudle-location-header',
  templateUrl: './location-header.component.html',
  styleUrls: ['./location-header.component.scss'],
})
export class LocationHeaderComponent implements OnInit {
  locationPageHeader: IListingPageHeader;
  richText: string;

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    this.getHeaderText();
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  getHeaderText() {
    this.cmsService.getDataBySlug('builds').subscribe((data) => {
      this.locationPageHeader = data;
      this.richText = this.cmsService.getHtmlFromBlock(data);
    });
  }
}
