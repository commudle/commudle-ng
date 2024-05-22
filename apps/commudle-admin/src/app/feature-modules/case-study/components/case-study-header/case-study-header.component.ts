import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { ICaseStudy } from 'apps/shared-models/case-study.model';
import { CmsService } from 'apps/shared-services/cms.service';

@Component({
  selector: 'commudle-case-study-header',
  templateUrl: './case-study-header.component.html',
  styleUrls: ['./case-study-header.component.scss'],
})
export class CaseStudyHeaderComponent implements OnInit {
  caseStudyPageHeader: ICaseStudy;
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
      if (this.caseStudyPageHeader.bannerImage) {
        this.BackgroundImage = this.imageUrl(this.caseStudyPageHeader.bannerImage).url();
      }
      this.richTextTagline = this.cmsService.getHtmlFromBlock(data, 'tagline');
    });
  }
}
