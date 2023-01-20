import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBlog } from 'apps/commudle-admin/src/app/feature-modules/public-blogs/models/blogs.model';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { CmsService } from 'apps/shared-services/cms.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss'],
})
export class BlogsListComponent implements OnInit, OnDestroy {
  blogs: IBlog[];
  isLoading = true;
  environment = environment;

  constructor(private cmsService: CmsService, private seoService: SeoService, private footerService: FooterService) {}

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  ngOnInit(): void {
    this.footerService.changeFooterStatus(true);
    this.getBlogs();
    this.setMeta();
  }
  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }

  getBlogs() {
    const fields = '_id,slug,title,publishedAt,meta_description,headerImage';
    const order = 'publishedAt desc';
    this.cmsService.getDataByTypeFieldOrder('blog', fields, order).subscribe((value: IBlog[]) => {
      this.blogs = value;
      this.isLoading = false;
    });
  }

  setMeta(): void {
    this.seoService.setTags(
      'Relating with Developers & Communities',
      'Blogs in the form of experiences and knowledge, authored by Developers, Designers, Community Managers and DevRels',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
