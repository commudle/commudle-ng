import { Component, Input, OnInit } from '@angular/core';
import { IListingPageHeader } from 'apps/shared-models/listing-page-header.model';
import { CmsService } from 'apps/shared-services/cms.service';

@Component({
  selector: 'commudle-location-header',
  templateUrl: './location-header.component.html',
  styleUrls: ['./location-header.component.scss'],
})
export class LocationHeaderComponent implements OnInit {
  @Input() locationPageHeader: IListingPageHeader;
  headerImagePath: string;
  richText: string;

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    this.headerImagePath = this.imageUrl(this.locationPageHeader.background_image).url();
    this.getHeaderText();
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  getHeaderText() {
    this.richText = this.cmsService.getHtmlFromBlock(this.locationPageHeader);
  }
}
