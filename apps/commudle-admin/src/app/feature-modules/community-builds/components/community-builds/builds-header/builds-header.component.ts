import { Component, OnInit } from '@angular/core';
import { CmsService } from 'apps/shared-services/cms.service';
import { IListingPageHeader } from 'apps/shared-models/listing-page-header.model';

@Component({
  selector: 'commudle-builds-header',
  templateUrl: './builds-header.component.html',
  styleUrls: ['./builds-header.component.scss'],
})
export class BuildsHeaderComponent implements OnInit {
  buildsPageHeader: IListingPageHeader;
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
      this.buildsPageHeader = data;
      this.richText = this.cmsService.getHtmlFromBlock(data);
    });
  }
}
