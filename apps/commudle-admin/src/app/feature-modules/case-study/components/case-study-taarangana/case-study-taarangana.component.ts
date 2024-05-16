import { Component, OnInit } from '@angular/core';
import { IListingPageHeader } from 'apps/shared-models/listing-page-header.model';
import { ITestimonial } from 'apps/shared-models/testimonial.model';
import { CmsService } from 'apps/shared-services/cms.service';

@Component({
  selector: 'commudle-case-study-taarangana',
  templateUrl: './case-study-taarangana.component.html',
  styleUrls: ['./case-study-taarangana.component.scss'],
})
export class CaseStudyTaaranganaComponent implements OnInit {
  // caseStudyPageHeader: IListingPageHeader;
  caseStudyPageHeader;
  richTextChallenges: string;
  richTextSolution: string;
  richTextStats: any[] = [];
  richTextTestimonials = [];
  // richTextTestimonials: ITestimonial[] = [];

  // stats: any[] = [
  //   {
  //     number: '8000+',
  //     name: 'Registrations',
  //     description: 'Thousands of developers use Commudle to share knowledge, build recognition and find opportunities.',
  //   },
  //   {
  //     number: '3000+',
  //     name: 'Attendees',
  //     description:
  //       'From being an organizer at a developer community to participating as a member in multiple others, developers empower each other by sharing knowledge.',
  //   },
  //   {
  //     number: '2',
  //     name: 'Days',
  //     description:
  //       "When we say diverse, we don't just mean location though, our users have vibrant technology backgrounds!",
  //   },
  // ];

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    this.getHeaderText();
    // this.getTestimonials();
  }

  getHeaderText() {
    this.cmsService.getDataBySlug('taarangana').subscribe((data) => {
      this.caseStudyPageHeader = data;
      console.log(this.caseStudyPageHeader);
      this.richTextChallenges = this.cmsService.getHtmlFromBlock(data, 'challenge');
      this.richTextSolution = this.cmsService.getHtmlFromBlock(data, 'solution');
      this.caseStudyPageHeader.stats.forEach((stat) => {
        this.richTextStats.push(this.cmsService.getHtmlFromBlock(stat));
      });
      this.caseStudyPageHeader.testimonials.forEach((testimonial) => {
        this.richTextTestimonials.push(this.cmsService.getHtmlFromBlock(testimonial));
        console.log(this.richTextTestimonials);
      });
    });
  }

  // getTestimonials() {
  //   this.cmsService
  //     .getDataByTypeWithFilter('publicTestimonials', 'testimonialType', 'Community_Leader', 10)
  //     .subscribe((data) => {
  //       if (data) {
  //         this.testimonials = data;
  //       }
  //     });
  // }
}
