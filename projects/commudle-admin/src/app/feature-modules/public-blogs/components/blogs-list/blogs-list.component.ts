import { Component, OnInit } from '@angular/core';
import { IBlog } from '../../Models/blogs.model';
import { CmsService } from 'projects/shared-services/cms.service';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'projects/shared-services/seo.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss'],
})
export class BlogsListComponent implements OnInit {
  constructor(private sanityService: CmsService, private seoService: SeoService, private meta: Meta) {}

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
      'title',
      'Relating with Developers & Communities',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
    this.seoService.setTags(
      'description',
      'Blogs in the form of experiences and knowledge, authored by Developers, Designers, Community Managers and DevRels',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
