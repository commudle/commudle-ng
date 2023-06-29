import { Component, OnInit } from '@angular/core';
import { CmsService } from 'apps/shared-services/cms.service';
import { IListingPageHeader } from 'apps/shared-models/listing-page-header.model';

@Component({
  selector: 'commudle-speakers-header',
  templateUrl: './speakers-header.component.html',
  styleUrls: ['./speakers-header.component.scss'],
})
export class SpeakersHeaderComponent implements OnInit {
  buildsPageHeader: IListingPageHeader;
  richText: string;
  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    // this.getHeaderText();
  }

  // imageUrl(source: any) {
  //   return this.cmsService.getImageUrl(source);
  // }

  // getHeaderText() {
  //   this.cmsService.getDataBySlug('speakers').subscribe((data) => {
  //     this.buildsPageHeader = data;
  //     this.richText = this.cmsService.getHtmlFromBlock(data);
  //   });
  // }
}
