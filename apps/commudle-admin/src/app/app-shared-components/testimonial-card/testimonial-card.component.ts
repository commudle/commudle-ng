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
      if (testimonial.username) {
        this.usersService.getProfile(testimonial.username).subscribe((data) => {
          if (data) {
            testimonial.user = data;
          }
        });
      }
    });
    // this.setSchema();
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  toggleShowFullTestimonial(index: number): void {
    this.showFullTestimonial[index] = !this.showFullTestimonial[index];
  }

  // setSchema() {
  //   const testimonialData = this.testimonials.map((testimonial) => {
  //     return {
  //       '@type': 'Review',
  //       name: testimonial.name,
  //       reviewBody: testimonial.content,
  //       datePublished: testimonial.createdAt,
  //       author: { '@type': 'Person', name: 'Commudle' },
  //       publisher: { '@type': 'Organization', name: 'Commudle' },
  //     };
  //   });
  //   this.seoService.setSchema({
  //     '@context': 'https://schema.org',
  //     '@type': 'Product',
  //     name: 'Commudle',
  //     mainEntity: testimonialData,
  //   });
  // }
}
