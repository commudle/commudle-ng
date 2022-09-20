import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICMSGuideline } from 'apps/commudle-admin/src/app/feature-modules/public-pages/models/guideline-cms.model';
import { CmsService } from '@commudle/shared-services';
import { SeoService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-public-page-guidelines',
  templateUrl: './public-page-guidelines.component.html',
  styleUrls: ['./public-page-guidelines.component.scss'],
})
export class PublicPageGuidelinesComponent implements OnInit {
  guideline: ICMSGuideline;
  richText: any;

  constructor(private cmsService: CmsService, private activatedRoute: ActivatedRoute, private seoService: SeoService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const slug: string = this.activatedRoute.snapshot.params.name;
    this.cmsService.getDataBySlug(slug).subscribe((value: ICMSGuideline) => {
      this.guideline = value;
      this.richText = this.cmsService.getHtmlFromBlock(value);
      this.setMeta();
    });
  }

  setMeta(): void {
    this.seoService.setTags(
      this.guideline.meta_title,
      this.guideline.meta_description,
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
