import { Component, OnInit } from '@angular/core';
import { SeoService } from 'apps/shared-services/seo.service';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { CmsService } from 'apps/shared-services/cms.service';
import { ITestimonial } from 'apps/shared-models/testimonial.model';

@Component({
  selector: 'commudle-aggencies',
  templateUrl: './aggencies.component.html',
  styleUrls: ['./aggencies.component.scss'],
})
export class AggenciesComponent implements OnInit {
  staticAssets = staticAssets;
  stats: any[] = [
    {
      number: '79k',
      name: 'Developers',
      description: 'Thousands of developers use Commudle to share knowledge, build recognition and find opportunities.',
    },
    {
      number: '250k',
      name: 'Community Roles',
      description:
        'From being an organizer at a developer community to participating as a member in multiple others, developers empower each other by sharing knowledge.',
    },
    {
      number: '5',
      name: 'Continents',
      description:
        "When we say diverse, we don't just mean location though, our users have vibrant technology backgrounds!",
    },
  ];

  testimonials: ITestimonial[];

  questions = [
    'Can I create multiple organizations or business pages which have communities under them?',
    'What is the subscription / payment model?',
    'Does Commudle have the option for custom dashboards and API’s?',
    'How do you ensure that my communities rank up on search engines?',
    'How do you ensure data privacy of the users and my clients?',
  ];

  answers = [
    'Yes, Commudle has the features for creating an umbrella of communities for different businesses you manage and each can have a separate page and communities under it. You can run multiple technology based, geography or any other classification based global communities on Commudle.',
    'You can purchase annual community subscriptions for individual chapters or in bulk exclusively for your business clients.',
    'Yes, we can create custom dashboards or API’s for you to integrate in your existing dashboards as per requirements. The charges for these can be a part of your subscription plan.',
    'All our pages with rich content are search engine optimized and we have dedicated experts who keep improving the strategy. Most of our existing active communities pages have top ranks on search engines.',
    'Commudle is GDPR compliant and ISO 27001 certified. We take data privacy very seriously and understand its importance for businesses and have placed consents at multiple points on the platform so that the users know how their data will be processed and who will have access to it.',
  ];

  constructor(private footerService: FooterService, private seoService: SeoService, private cmsService: CmsService) {}

  ngOnInit(): void {
    this.footerService.changeFooterStatus(true);
    this.setMeta();
    this.getTestimonials();
  }

  ngOnDestroy() {
    this.footerService.changeFooterStatus(false);
  }

  setMeta(): void {
    this.seoService.setTags(
      'For DevRel Agencies',
      "Build developer programs using Commudle's developer focused engagement features. Host events, run forums & channels, send newsletters. All at one place!",
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }

  getTestimonials() {
    this.cmsService
      .getDataByTypeWithFilter('publicTestimonials', 'testimonialType', 'Community_Leader')
      .subscribe((data) => {
        this.testimonials = data;
      });
  }
}
