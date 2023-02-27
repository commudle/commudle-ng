import { Component, Input, OnInit } from '@angular/core';
import { IBlog } from 'apps/commudle-admin/src/app/feature-modules/public-blogs/models/blogs.model';
import { CmsService } from 'apps/shared-services/cms.service';
import { environment } from 'apps/commudle-admin/src/environments/environment';

@Component({
  selector: 'commudle-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent implements OnInit {
  @Input() blogs: IBlog[];
  @Input() shareButton = true;
  environment = environment;
  imageLoading = true;

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {}

  imageUrl(source: any) {
    this.imageLoading = false;
    return this.cmsService.getImageUrl(source);
  }
}
