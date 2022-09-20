import { Component, OnInit } from '@angular/core';
import { environment } from '@commudle/shared-environments';
import { CmsService, SeoService } from '@commudle/shared-services';
import { IBlog } from '../../models/blogs.model';

@Component({
  selector: 'commudle-blogs',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss'],
})
export class BlogsListComponent implements OnInit {
  blogs: IBlog[];
  isLoading = true;

  environment = environment;

  constructor(private cmsService: CmsService, private seoService: SeoService) {}

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  ngOnInit(): void {
    this.getBlogs();
    this.setMeta();
  }

  getBlogs() {
    this.cmsService.getDataByType('blog').subscribe((value: IBlog[]) => {
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
