import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import { ICMSAbout } from 'projects/commudle-admin/src/app/components/about/models/about-cms.model';
import { CmsService } from 'projects/shared-services/cms.service';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, OnDestroy {
  ICmsAbout: ICMSAbout;

  constructor(private cmsService: CmsService, private seoService: SeoService) {}

  ngOnInit(): void {
    // this.setMeta();
    this.getData();

    this.seoService.noIndex(true);
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
  }

  // setMeta(): void {
  //   this.seoService.setTitle('About');
  //   this.meta.updateTag({
  //     name: 'description',
  //     content: `We aim to provide a platform where all the amazing content, ranging from slides, to sessions (even links to those) are all at one place. We want to know what those amazing side projects you have built, even if it's yet to be given those finishing touches.`,
  //   });
  //
  //   this.meta.updateTag({ name: 'og:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
  //   this.meta.updateTag({
  //     name: 'og:image:secure_url',
  //     content: 'https://commudle.com/assets/images/commudle-logo192.png',
  //   });
  //   this.meta.updateTag({ name: 'og:title', content: `About` });
  //   this.meta.updateTag({
  //     name: 'og:description',
  //     content: `We aim to provide a platform where all the amazing content, ranging from slides, to sessions (even links to those) are all at one place. We want to know what those amazing side projects you have built, even if it's yet to be given those finishing touches.`,
  //   });
  //   this.meta.updateTag({ name: 'og:type', content: 'website' });
  //
  //   this.meta.updateTag({ name: 'twitter:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
  //   this.meta.updateTag({ name: 'twitter:title', content: `About` });
  //   this.meta.updateTag({
  //     name: 'twitter:description',
  //     content: `We aim to provide a platform where all the amazing content, ranging from slides, to sessions (even links to those) are all at one place. We want to know what those amazing side projects you have built, even if it's yet to be given those finishing touches.`,
  //   });
  // }

  getData(): void {
    this.cmsService.getDataBySlug('about-page').subscribe((value) => (this.ICmsAbout = value));
  }

  getImageUrl(value: SanityImageObject): ImageUrlBuilder {
    if (!value) return null;

    return this.cmsService.getImageUrl(value);
  }
}
