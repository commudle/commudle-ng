import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'projects/shared-models/user.model';
import { CmsService } from 'projects/shared-services/cms.service';
import { Blog } from '../../Models/blogs.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  blog: Blog;
  richText: any;
  user: IUser;

  constructor(private cmsService: CmsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getData();
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  getData() {
    const slug: string = this.activatedRoute.snapshot.params.name;
    this.cmsService.getDataBySlug(slug).subscribe((value: Blog) => {
      this.blog = value;
      this.richText = this.cmsService.getHtmlFromBlock(value);
      this.setUser();
    });
  }
  setUser() {
    this.user = {
      name: this.blog.name,
      username: this.blog.username,
      designation: this.blog.designation,
      photo: {
        i64: this.imageUrl(this.blog.avatar).toString(),
      },
    } as IUser;
  }
}
