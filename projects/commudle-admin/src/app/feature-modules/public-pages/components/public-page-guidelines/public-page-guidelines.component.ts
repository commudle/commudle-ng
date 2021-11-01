import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ICMSGuideline } from 'projects/commudle-admin/src/app/feature-modules/public-pages/models/guideline-cms.model';
import { CmsService } from 'projects/shared-services/cms.service';

@Component({
  selector: 'app-public-page-guidelines',
  templateUrl: './public-page-guidelines.component.html',
  styleUrls: ['./public-page-guidelines.component.scss'],
})
export class PublicPageGuidelinesComponent implements OnInit {
  guideline: ICMSGuideline;
  richText: any;

  constructor(
    private cmsService: CmsService,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.guideline = this.activatedRoute.snapshot.data.publicPage;
    this.richText = this.cmsService.getHtmlFromBlock(this.guideline);
    this.setMeta();
  }

  setMeta(): void {
    this.title.setTitle(this.guideline.meta_title);
    this.meta.updateTag({
      name: 'description',
      content: this.guideline.meta_description,
    });

    this.meta.updateTag({
      name: 'og:image',
      content: `${
        this.cmsService.getImageUrl(this.guideline.meta_thumbnail) ||
        'https://commudle.com/assets/images/commudle-logo192.png'
      }`,
    });
    this.meta.updateTag({
      name: 'og:image:secure_url',
      content: `${
        this.cmsService.getImageUrl(this.guideline.meta_thumbnail) ||
        'https://commudle.com/assets/images/commudle-logo192.png'
      }`,
    });
    this.meta.updateTag({ name: 'og:title', content: this.guideline.meta_title });
    this.meta.updateTag({
      name: 'og:description',
      content: this.guideline.meta_description,
    });
    this.meta.updateTag({ name: 'og:type', content: 'website' });

    this.meta.updateTag({
      name: 'twitter:image',
      content: `${
        this.cmsService.getImageUrl(this.guideline.meta_thumbnail) ||
        'https://commudle.com/assets/images/commudle-logo192.png'
      }`,
    });
    this.meta.updateTag({ name: 'twitter:title', content: this.guideline.meta_title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: this.guideline.meta_description,
    });

    this.meta.updateTag({
      name: 'author',
      content: 'Commudle',
    });
  }
}
