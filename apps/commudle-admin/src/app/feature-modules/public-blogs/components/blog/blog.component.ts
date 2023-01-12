import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'apps/shared-models/user.model';
import { CmsService } from 'apps/shared-services/cms.service';
import { Subscription } from 'rxjs';
import { IBlog } from 'apps/commudle-admin/src/app/feature-modules/public-blogs/models/blogs.model';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { environment } from 'apps/commudle-admin/src/environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  @Input() activateMiniProfileDirective = true;
  blog: IBlog;
  richText: string;
  user: IUser;

  subscriptions: Subscription[] = [];

  isLoading = true;
  ImageLoading = true;

  environment = environment;

  constructor(
    private cmsService: CmsService,
    private activatedRoute: ActivatedRoute,
    private appUsersService: AppUsersService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  imageUrl(source: any) {
    this.ImageLoading = false;
    return this.cmsService.getImageUrl(source);
  }

  getData() {
    const slug: string = this.activatedRoute.snapshot.params.id;
    this.cmsService.getDataBySlug(slug).subscribe((value: IBlog) => {
      this.blog = value;
      this.richText = this.cmsService.getHtmlFromBlock(value);
      this.setUser();
      this.setMeta();
      this.isLoading = false;
    });
  }

  setUser() {
    this.subscriptions.push(
      this.appUsersService.getProfile(this.blog.username).subscribe((data) => {
        this.user = data;
        this.setSchema();
      }),
    );
  }

  setSchema() {
    this.seoService.setSchema({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${environment.app_url}/blogs/${this.blog.slug}`,
      },
      headline: this.blog.title,
      description: this.blog.meta_description,
      image: this.imageUrl(this.blog.headerImage).url(),
      author: {
        type: 'Person',
        name: this.user.name,
        url: `${environment.app_url}/users/${this.blog.username}`,
      },
      datePublished: this.blog.publishedAt,
    });
  }

  setMeta(): void {
    this.seoService.setTags(
      this.blog.title + ' - Commudle',
      this.blog.meta_description,
      this.imageUrl(this.blog.headerImage).url(),
    );
  }
}
