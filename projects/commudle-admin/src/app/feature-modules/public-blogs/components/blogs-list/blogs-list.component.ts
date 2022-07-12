import { Component, OnInit } from '@angular/core';
import { Blog } from '../../Models/blogs.model';
import { CmsService } from 'projects/shared-services/cms.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss'],
})
export class BlogsListComponent implements OnInit {
  constructor(private sanityService: CmsService) {}

  blogs: Blog[] = [];

  imageUrl(source: any) {
    return this.sanityService.getImageUrl(source);
  }

  ngOnInit(): void {
    this.getBlogs();
  }

  async getBlogs(): Promise<Blog[]> {
    this.blogs = await this.sanityService.getBlogs();
    return this.blogs;
  }
}
