import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { IListingPageHeader } from 'apps/shared-models/listing-page-header.model';
import { CmsService } from 'apps/shared-services/cms.service';

@Component({
  selector: 'commudle-case-study-header',
  templateUrl: './case-study-header.component.html',
  styleUrls: ['./case-study-header.component.scss'],
})
export class CaseStudyHeaderComponent implements OnInit {
  caseStudyPageHeader: IListingPageHeader;
  richText: string;
  BackgroundImage;
  staticAssets = staticAssets;
  richTextTagline: string;

  constructor(private cmsService: CmsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const slug = params.slug;
      this.getHeaderText(slug);
    });
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  getHeaderText(slug: string) {
    this.cmsService.getDataBySlug(slug).subscribe((data) => {
      this.caseStudyPageHeader = data;
      this.BackgroundImage = this.imageUrl(this.caseStudyPageHeader.bannerImage).url();
      this.richTextTagline = this.cmsService.getHtmlFromBlock(data, 'tagline');
    });
  }
}
