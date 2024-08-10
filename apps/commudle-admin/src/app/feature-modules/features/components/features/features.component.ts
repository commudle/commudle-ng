import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IFeature } from 'apps/shared-models/features.model';
import { CmsService } from 'apps/shared-services/cms.service';
import { ResponsiveService } from 'apps/shared-services/responsive.service';
import { Subscription } from 'rxjs';
import { SeoService } from '@commudle/shared-services';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { faArrowRightArrowLeft, faArrowUpRightDots, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';
import { DarkModeService } from 'apps/commudle-admin/src/app/services/dark-mode.service';

@Component({
  selector: 'commudle-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit, OnDestroy {
  @Input() categoryName = 'all';
  @Input() showHeading = true;
  @Input() showSubHeading = true;
  features: IFeature[];
  isLoading = true;
  selectedFeature: IFeature;
  isMobileView: boolean;
  subscriptions: Subscription[] = [];
  staticAssets = staticAssets;
  faArrowUpRightDots = faArrowUpRightDots;
  faChartSimple = faChartSimple;
  faArrowRightArrowLeft = faArrowRightArrowLeft;
  isDarkMode = false;

  questions = [
    'Is there an option to run multiple communities?',
    'What are the different pricing plans?',
    'How do new members find my community on Commudle automatically?',
    'I want to migrate my existing community to Commudle, how to do it?',
    'Yes, your can sell tickets for your events. We have built integration with Razorpay for our Indian users. Paid ticketing for international users is underway.',
  ];

  answers = [
    'Yes, you can run multiple communities on Commudle. You can also build one or more umbrella organizations to group your communities together',
    'Please visit https://www.commudle.com/pricing to know more.',
    'When you announce any activity, example an event, a new channel or a newsletter, the users on Commudle are able to view it in the latest updates on the platform. They also get to know about it from the activity of people in their network on Commudle.',
    'Our team is here to guide you with a custom migration plan for your community. Please contact your account manager or write to use at support@commudle.com.',
    'Yes, we have built integrations with Stripe and Razorpay for you to sell tickets.',
  ];

  constructor(
    private cmsService: CmsService,
    private responsiveService: ResponsiveService,
    private seoService: SeoService,
    private footerService: FooterService,
    private darkModeService: DarkModeService,
  ) {}

  ngOnInit(): void {
    this.footerService.changeFooterStatus(true);
    this.isMobileView = this.responsiveService.isMobileView();
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
    this.getIndex();
    this.setMeta();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getIndex(): void {
    const filterType = 'category[].name';
    this.subscriptions.push(
      this.cmsService.getDataByTypeWithFilter('featuredPage', filterType, this.categoryName, 100).subscribe((value) => {
        if (value) {
          const sortedFeatures = this.sortFeaturesByCategory(value, this.categoryName);
          this.features = sortedFeatures;
        }
      }),
    );
  }

  sortFeaturesByCategory(features: any[], categoryName: string): any[] {
    return features
      .filter((feature) => feature.category.some((cat) => cat.name === categoryName))
      .sort((a, b) => {
        const aOrder = a.category.find((cat) => cat.name === categoryName)?.order;
        const bOrder = b.category.find((cat) => cat.name === categoryName)?.order;
        return aOrder - bOrder;
      });
  }

  getFeaturesData(slug) {
    this.isLoading = true;
    this.selectedFeature = null;
    this.subscriptions.push(
      this.cmsService.getDataBySlug(slug).subscribe((value) => {
        if (value) {
          this.selectedFeature = value;
        }
        this.isLoading = false;
      }),
    );
  }

  setMeta(): void {
    this.seoService.setTags(
      'Features',
      "One stop solution for all your developer relations team's needs. Build one community or a global network of communities with multiple engagements.",
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
