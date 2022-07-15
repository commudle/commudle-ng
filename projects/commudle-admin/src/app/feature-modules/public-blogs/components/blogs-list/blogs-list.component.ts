import { Component, OnInit } from '@angular/core';
import { IBlog } from '../../models/blogs.model';
import { CmsService } from 'projects/shared-services/cms.service';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss'],
})
export class BlogsListComponent implements OnInit {
  constructor(private sanityService: CmsService, private seoService: SeoService) {}

  blogs: IBlog[] = [];
  richText: any;

  imageUrl(source: any) {
    return this.sanityService.getImageUrl(source);
  }

  ngOnInit(): void {
    this.getBlogs();
    this.setMeta();
  }

  async getBlogs(): Promise<IBlog[]> {
    this.blogs = await this.sanityService.getBlogs();
    return this.blogs;
  }

  setMeta(): void {
    this.seoService.setTags(
      'Relating with Developers & Communities',
      'Blogs in the form of experiences and knowledge, authored by Developers, Designers, Community Managers and DevRels',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
