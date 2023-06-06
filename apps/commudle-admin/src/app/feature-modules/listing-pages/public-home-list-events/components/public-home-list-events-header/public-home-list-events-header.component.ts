import { Component, OnInit } from '@angular/core';
import { CmsService } from 'apps/shared-services/cms.service';
import { IListingPageHeader } from 'apps/shared-models/listing-page-header.model';

@Component({
  selector: 'commudle-public-home-list-events-header',
  templateUrl: './public-home-list-events-header.component.html',
  styleUrls: ['./public-home-list-events-header.component.scss'],
})
export class PublicHomeListEventsHeaderComponent implements OnInit {
  listingPageHeader: IListingPageHeader;

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    this.getHeaderText();
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  getHeaderText() {
    this.cmsService.getDataBySlug('event-listing-page').subscribe((data) => {
      this.listingPageHeader = data;
    });
  }
}
