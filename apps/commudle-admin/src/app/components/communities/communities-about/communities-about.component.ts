import { Component, OnInit } from '@angular/core';
import { CmsService } from 'apps/shared-services/cms.service';
import { IListingPageHeader } from 'apps/shared-models/listing-page-header.model';
// import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
@Component({
  selector: 'app-communities-about',
  templateUrl: './communities-about.component.html',
  styleUrls: ['./communities-about.component.scss'],
})
export class CommunitiesAboutComponent implements OnInit {
  communitiesPageHeader: IListingPageHeader;
  richText: string;
  // staticAssets = staticAssets;
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
      console.log(this.communitiesPageHeader);
      this.richText = this.cmsService.getHtmlFromBlock(data);
    });
  }

  // Function to scroll to communities list section
  // scrollToCommunitiesList(): void {
  //   const element = document.getElementById('communities-list');
  //   window.scroll({ top: element.offsetTop - 56, behavior: 'smooth' });
  // }
}
