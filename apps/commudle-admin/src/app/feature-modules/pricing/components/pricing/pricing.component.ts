import { Component, OnDestroy, OnInit } from '@angular/core';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { DarkModeService } from 'apps/commudle-admin/src/app/services/dark-mode.service';
import { Subscription } from 'rxjs';
import { CmsService } from 'apps/shared-services/cms.service';
import { faArrowDown, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { IPricing, IPricingFeatures } from 'apps/shared-models/pricing-features.model';
import { ECmsType } from 'apps/shared-models/enums/cms.enum';
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit, OnDestroy {
  staticAssets = staticAssets;
  isMobileView = false;
  isDarkMode = false;
  enterprise: IPricing;
  startup: IPricing;
  devrel: IPricing;
  isMonthly = true;
  isAnually = false;
  faCircleCheck = faCircleCheck;
  pricingFeatures: IPricingFeatures[] = [];
  showAllFeatures = true;
  faArrowDown = faArrowDown;
  faCircleXmark = faCircleXmark;
  ECmsType = ECmsType;

  logoCloud: { image: string; name: string; slug: string; description: string }[] = [
    {
      name: 'Google Developer Groups',
      slug: 'gdg',
      description:
        'GDG New Delhi, Noida, Cloud, Siliguri and many more communities from the Google Developers ecosystem.',
      image:
        'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbmNlIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1931d8ac25e32d52949f7069bfa3ceaf01db6524/gdg_new_delhi.png',
    },
    {
      name: 'Women Who Code Delhi',
      slug: 'women who code',
      description:
        'WWC Delhi is the one of the largest and most active community of engineers for inspiring women in tech.',
      image:
        'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbmdlIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0eea224f77b91c395fe673164ee631209119061b/women_who_code_delhi.jpg',
    },
    {
      name: 'Microsoft Learn Student Ambassador',
      slug: 'microsoft',
      description: 'From Student Partner Communities to Ambassador and MVP communities, a flourishing ecosystem.',
      image:
        "https://json.commudle.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbTZ6IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4f526e73c5364dd74efad7dfba8608f1a0309395/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFKZUFXa0NYZ0U2QzJ4dllXUmxjbnNHT2dsd1lXZGxNQT09IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--1b54362eb80bd09837e5bde550bb5151f95283d3/Microsoft%20Learn%20Student%20Ambassadors'%20Chapter.png",
    },
    {
      name: 'Tensor Flow User Groups',
      slug: 'tensorflow',
      description: 'The most active machine learning communities in the world.',
      image:
        'https://json.commudle.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdEVPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--19a346d2585fbd6fd86b2a193ede2a9be1d4c7b6/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFKZUFXa0NYZ0U2QzJ4dllXUmxjbnNHT2dsd1lXZGxNQT09IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--1b54362eb80bd09837e5bde550bb5151f95283d3/TF_FullColor_Stacked.png',
    },
    {
      name: 'Robotex India',
      slug: 'robotex',
      description: 'One of the largest robotics communities which is empowering students to build unique solutions',
      image:
        'https://json.commudle.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNU0yQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--bc2e10c5f6c0d0601d382add9cae31c7258fc941/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFKZUFXa0NYZ0U2QzJ4dllXUmxjbnNHT2dsd1lXZGxNQT09IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--1b54362eb80bd09837e5bde550bb5151f95283d3/Robotex_India.png',
    },
    {
      name: 'IEEE',
      slug: 'ieee',
      description: 'The largest communities of engineers across the world.',
      image:
        'https://json.commudle.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaE8vIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--05e1517a8137079260ec3f02571686337815a16e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFKZUFXa0NYZ0U2QzJ4dllXUmxjbnNHT2dsd1lXZGxNQT09IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--1b54362eb80bd09837e5bde550bb5151f95283d3/IEEE%20JHSB%20logo%20colored.png',
    },
  ];

  answers = [
    "We don't think so, the Developer Communities on Commudle are able to manage all their activities here.",
    "You can host your complete Developer Ecosystem with 100's of Communities on Commudle. We have an organization page too. You have access to all the data and stats you need.",
    "As a DevRel, it's important to have an experience of building and growing your own Developer Community. Some folks are at leading DevRel positions who started by building their own Community here.",
    "Yes! From Startup plan and upwards you get access to our API's which can be used to display summary of your communities' activities on your own web page.",
    "Yes! And it's very easy.",
    'Absolutely, a few Design Communities are already using Commudle.',
    'Yes, Commudle supports paid tickets in events. Community organizers can access this feature from their community admin dashboard.',
    "We use Stripe which has standard payment rates for payments made through different countries defined on this link: https://stripe.com/en-in/pricing. Commudle charges a standard platform fee. Depending on the plan purchased by you this fee can be a part of the annual subscription as a business so that your community leaders don't have to pay for it.",
    "Yes, unless it's a premium feature, it will be a part of your existing subscription, we will notify you in advance.",
    'Yes, our users extend across the world.',
  ];

  constructor(
    private seoService: SeoService,
    private gtm: GoogleTagManagerService,
    private footerService: FooterService,
    private darkModeService: DarkModeService,
    private cmsService: CmsService,
  ) {}

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 1024;
    this.footerService.changeFooterStatus(true);
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
    this.seoService.setTags(
      'Pricing - Community Subscriptions on Commudle',
      'Choose a pricing plan which is right for your developer community program. Plans include events, hackathons, newsletters, channels, forums etc. We also have a preferred partner network.',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
    this.getEnterpriseData();
    this.getStartupData();
    this.getDevrelData();
    this.getPricingFeatures();
    if (this.isMobileView) {
      this.showAllFeatures = false;
    }
  }

  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }

  gtmDatalayerPush(event) {
    this.gtm.dataLayerPushEvent('click-pricing-plan', { com_plan_type: event });
  }

  getUseCaseCardsUrl() {
    if (!this.isDarkMode) {
      if (this.isMobileView) {
        return "url('" + staticAssets.pricing_usecase_cards_mobile + "')";
      } else {
        return "url('" + staticAssets.pricing_usecase_cards_desktop + "')";
      }
    }
  }

  getCommunityLogoCardsUrl() {
    if (!this.isDarkMode) {
      if (this.isMobileView) {
        return "url('" + staticAssets.pricing_community_logo_mobile + "')";
      } else {
        return "url('" + staticAssets.pricing_community_logo_desktop + "')";
      }
    }
  }

  getEnterpriseData(): void {
    this.cmsService.getDataBySlug('pp-commudle-for-enterprises').subscribe((value) => {
      this.enterprise = value;
      this.setSchema(this.enterprise);
    });
  }

  getStartupData(): void {
    this.cmsService.getDataBySlug('pp-commudle-for-startups').subscribe((value) => {
      this.startup = value;
      this.setSchema(this.startup);
    });
  }

  getDevrelData(): void {
    this.cmsService.getDataBySlug('pp-commudle-for-devrel-agencies').subscribe((value) => {
      this.devrel = value;
    });
  }

  getPricingFeatures() {
    const fields = 'name, order, features';
    const order = 'order asc';
    this.cmsService.getDataByTypeFieldOrder(ECmsType.PRICING_PLAN_FEATURES, fields, order).subscribe((value) => {
      this.pricingFeatures = value;
    });
  }

  toggleSubscription(value) {
    this.isMonthly = value === 'monthly' ? true : false;
    this.isAnually = value === 'anually' ? true : false;
  }

  toggleShowAllFeatures() {
    this.showAllFeatures = !this.showAllFeatures;
  }

  setSchema(planType) {
    this.seoService.setSchema({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: planType.name,
      image: 'https://www.commudle.com/assets/images/commudle-logo-full.png',
      description: planType.description,
      brand: 'Commudle',
      offers: {
        '@type': 'Offer',
        url: 'https://www.commudle.com/pricing',
        price: this.isMonthly
          ? this.enterprise?.priceDetails[1]?.price_after_discount || this.enterprise?.priceDetails[1]?.price
          : this.enterprise?.priceDetails[0]?.price_after_discount || this.enterprise?.priceDetails[0]?.price,
        priceCurrency: this.isMonthly
          ? this.enterprise?.priceDetails[1]?.currencyType === '$'
            ? 'USD'
            : 'INR'
          : this.enterprise?.priceDetails[0]?.currencyType === '$'
          ? 'USD'
          : 'INR',
      },
    });
  }
}
