import { Component, Input, OnInit } from '@angular/core';
import { ITestimonial } from 'apps/shared-models/testimonial.model';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { SeoService } from '@commudle/shared-services';
import { CmsService } from 'apps/shared-services/cms.service';

@Component({
  selector: 'commudle-testimonial-card',
  templateUrl: './testimonial-card.component.html',
  styleUrls: ['./testimonial-card.component.scss'],
})
export class TestimonialCardComponent implements OnInit {
  @Input() testimonials: ITestimonial[];
  showFullTestimonial: boolean[] = [];

  constructor(private usersService: AppUsersService, private seoService: SeoService, private cmsService: CmsService) {}

  ngOnInit(): void {
    this.testimonials.forEach((testimonial) => {
      this.setSchema(testimonial);
      if (testimonial.username) {
        this.usersService.getProfile(testimonial.username).subscribe((data) => {
          if (data) {
            testimonial.user = data;
          }
        });
      }
    });
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  toggleShowFullTestimonial(index: number): void {
    this.showFullTestimonial[index] = !this.showFullTestimonial[index];
  }

  setSchema(testimonial) {
    this.seoService.setSchema({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Commudle',
      image: 'https://www.commudle.com/assets/images/commudle-logo-full.png',
      review: {
        '@type': 'Review',
        reviewBody: testimonial.content,
        datePublished: testimonial.createdAt,
        author: { '@type': 'Person', name: testimonial.name },
        publisher: { '@type': 'Organization', name: 'Commudle' },
      },
    });
  }
}
