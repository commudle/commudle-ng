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
  similarBlogs: IBlog[] = [];
  richText: string;
  user: IUser;
  faqSchemaData: any;
  faqSchemaDataMainEntity = [];

  subscriptions: Subscription[] = [];

  isLoading = true;
  ImageLoading = true;

  environment = environment;

  constructor(
    private cmsService: CmsService,
    private activatedRoute: ActivatedRoute,
    private appUsersService: AppUsersService,
    private seoService: SeoService,
  ) {
    activatedRoute.params.subscribe(() => {
      this.getData();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  imageUrl(source: any) {
    this.ImageLoading = false;
    return this.cmsService.getImageUrl(source);
  }

  getData() {
    const slug: string = this.activatedRoute.snapshot.params.id;
    this.subscriptions.push(
      this.cmsService.getDataBySlug(slug).subscribe((value: IBlog) => {
        this.blog = value;
        this.richText = this.cmsService.getHtmlFromBlock(value);
        this.setUser();
        this.setMeta();
        this.isLoading = false;
        if (this.blog.similarBlogs) {
          this.getSimilarBlogs(this.blog.similarBlogs);
        }
      }),
    );
  }

  getSimilarBlogs(similarBlogsSlug) {
    this.similarBlogs = [];
    for (const blogSlug of similarBlogsSlug) {
      this.subscriptions.push(
        this.cmsService.getDataBySlug(blogSlug).subscribe((value: IBlog) => {
          this.similarBlogs.push(value);
        }),
      );
    }
  }

  setUser() {
    this.subscriptions.push(
      this.appUsersService.getProfile(this.blog.username).subscribe((data) => {
        this.user = data;
        this.setFaqSchemaData();
      }),
    );
  }

  setFaqSchemaData() {
    if (this.blog.faq) {
      for (const blogFaq of this.blog.faq) {
        this.faqSchemaDataMainEntity.push({
          '@type': 'Question',
          name: blogFaq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: blogFaq.answer,
          },
        });
      }
      this.faqSchemaData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        headline: 'FAQPage',
        mainEntity: this.faqSchemaDataMainEntity,
      };
      this.setSchema(this.faqSchemaData);
    } else {
      this.setSchema();
    }
  }

  setSchema(faqSchemaData?) {
    this.seoService.setSchema([
      {
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
      },
      faqSchemaData ? faqSchemaData : '',
    ]);
  }

  setMeta(): void {
    this.seoService.setTags(
      this.blog.title + ' - Commudle',
      this.blog.meta_description,
      this.imageUrl(this.blog.headerImage).url(),
    );
  }
}
