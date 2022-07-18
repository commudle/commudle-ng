import { Component, OnInit } from '@angular/core';
import { IBlog } from 'projects/commudle-admin/src/app/feature-modules/public-blogs/models/blogs.model';
import { CmsService } from 'projects/shared-services/cms.service';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss'],
})
export class BlogsListComponent implements OnInit {
  constructor(private cmsService: CmsService, private seoService: SeoService) {}

  blogs: IBlog;
  richText: any;

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  ngOnInit(): void {
    this.getBlogs();
    this.setMeta();
  }

  getBlogs() {
    this.cmsService.getDataByType('blog').subscribe((value: IBlog) => {
      this.blogs = value;
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
