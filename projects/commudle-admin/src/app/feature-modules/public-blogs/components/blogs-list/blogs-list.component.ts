import { Component, OnInit } from '@angular/core';
import { IBlog } from 'projects/commudle-admin/src/app/feature-modules/public-blogs/models/blogs.model';
import { CmsService } from 'projects/shared-services/cms.service';
import { SeoService } from 'projects/shared-services/seo.service';
import { environment } from 'projects/commudle-admin/src/environments/environment';
import { NavigatorShareService } from 'projects/shared-services/navigator-share.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss'],
})
export class BlogsListComponent implements OnInit {
  constructor(
    private cmsService: CmsService,
    private seoService: SeoService,
    private navigatorShareService: NavigatorShareService,
    private libToastLogService: LibToastLogService,
    private clipboard: Clipboard,
  ) {}

  blogs: IBlog;
  richText: any;

  isLoading = false;

  environment = environment;

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  ngOnInit(): void {
    this.getBlogs();
    this.setMeta();
  }

  getBlogs() {
    this.isLoading = true;
    this.cmsService.getDataByType('blog').subscribe((value: IBlog) => {
      this.blogs = value;
    });
    this.isLoading = false;
  }

  setMeta(): void {
    this.seoService.setTags(
      'Relating with Developers & Communities',
      'Blogs in the form of experiences and knowledge, authored by Developers, Designers, Community Managers and DevRels',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }

  copyTextToClipboard(title, slug): void {
    if (!this.navigatorShareService.canShare()) {
      if (this.clipboard.copy(`${environment.app_url}/blogs/${slug}`)) {
        this.libToastLogService.successDialog('Copied the message successfully!');
      }
      return;
    }
    this.navigatorShareService
      .share({
        title: `${title}`,
        text: `${title}`,
        url: `${environment.app_url}/blogs/${slug}`,
      })
      .then(() => {
        this.libToastLogService.successDialog('Shared successfully!');
      });
  }
}
