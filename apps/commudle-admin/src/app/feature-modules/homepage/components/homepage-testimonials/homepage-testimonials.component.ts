import { Component, OnInit } from '@angular/core';
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import { ITestimonial } from 'apps/commudle-admin/src/app/feature-modules/homepage/models/testimonial.model';
import { IUser } from '@commudle/shared-models';
import { CmsService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-homepage-testimonials',
  templateUrl: './homepage-testimonials.component.html',
  styleUrls: ['./homepage-testimonials.component.scss'],
})
export class HomepageTestimonialsComponent implements OnInit {
  testimonials: ITestimonial[] = [];
  selectedTestimonial: ITestimonial;
  user: IUser;

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    this.getTestimonials();
  }

  getTestimonials() {
    this.cmsService.getDataByType('testimonials').subscribe((value: ITestimonial[]) => {
      this.testimonials = value.sort((a, b) => a.order - b.order);
      this.selectedTestimonial = this.testimonials[0];
      this.setUser();
    });
  }

  setTestimonial(direction: number) {
    const index = this.testimonials.indexOf(this.selectedTestimonial);
    this.selectedTestimonial =
      direction === 1
        ? index === this.testimonials.length - 1
          ? this.testimonials[0]
          : this.testimonials[index + 1]
        : index === 0
        ? this.testimonials[this.testimonials.length - 1]
        : this.testimonials[index - 1];
    this.setUser();
  }

  setUser() {
    this.user = {
      name: this.selectedTestimonial.name,
      username: this.selectedTestimonial.username,
      designation: this.selectedTestimonial.designation,
      photo: {
        i64: this.getImageUrl(this.selectedTestimonial.avatar).toString(),
      },
    } as IUser;
  }

  getImageUrl(value: SanityImageObject): ImageUrlBuilder {
    if (!value) return null;

    return this.cmsService.getImageUrl(value);
  }
}
