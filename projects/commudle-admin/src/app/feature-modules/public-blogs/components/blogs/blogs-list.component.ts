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
  // richText: any;

  imageUrl(source: any) {
    return this.sanityService.getImageUrl(source);
  }

  ngOnInit(): void {
    this.getBlogs();
    console.log(this.blogs);
  }

  // blogs store in array
  async getBlogs(): Promise<Blog[]> {
    this.blogs = await this.sanityService.getBlogs();
    return this.blogs;
  }

  // getData() {
  //   const slug: string = this.activatedRoute.snapshot.params.name;
  //   this.sanityService.getDataBySlug(slug).subscribe((value: Blog) => {
  //     this.blogs = value;
  //     this.richText = this.sanityService.getHtmlFromBlock(value);
  //   });
  // }
}
