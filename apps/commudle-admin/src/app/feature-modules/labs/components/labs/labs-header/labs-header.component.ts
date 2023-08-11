import { Component, OnInit } from '@angular/core';
import { CmsService } from 'apps/shared-services/cms.service';
import { IListingPageHeader } from 'apps/shared-models/listing-page-header.model';
import { faFlask } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-labs-header',
  templateUrl: './labs-header.component.html',
  styleUrls: ['./labs-header.component.scss'],
})
export class LabsHeaderComponent implements OnInit {
  labsPageHeader: IListingPageHeader;
  richText: string;
  faFlask = faFlask;

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    this.getHeaderText();
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  getHeaderText() {
    this.cmsService.getDataBySlug('labs').subscribe((data) => {
      this.labsPageHeader = data;
      this.richText = this.cmsService.getHtmlFromBlock(data);
    });
  }
}
