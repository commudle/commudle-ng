import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IHomepageAction } from 'apps/commudle-admin/src/app/feature-modules/homepage/models/homepage-action.model';
import { SearchStatusService } from 'apps/commudle-admin/src/app/feature-modules/search/services/search-status.service';
import { CmsService } from 'apps/shared-services/cms.service';
import { IsBrowserService } from 'apps/shared-services/is-browser.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy, AfterViewInit {
  timer$: Observable<number>;

  @ViewChild('homepageAnimation', { static: false }) homepageAnimationContainer: ElementRef<HTMLDivElement>;

  homepageActions: IHomepageAction[] = [];
  homepageCallouts: { subtitle: string; title: string }[] = [
    {
      title: 'Are you a Student?',
      subtitle: 'Start a Developer community for Free!',
    },
    {
      title: 'Are you a DevRel?',
      subtitle: 'Build your Developer Ecosystem',
    },
    {
      title: 'Are you a Startup?',
      subtitle: 'Build your brand with communities & network',
    },
  ];

  constructor(
    private seoService: SeoService,
    private searchStatusService: SearchStatusService,
    private cmsService: CmsService,
    public isBrowserService: IsBrowserService,
  ) {
    this.timer$ = timer(0, 3000);
  }

  ngOnInit(): void {
    this.searchStatusService.setSearchStatus(false);

    this.getHomepageActions();

    this.seoService.setTags(
      'Commudle - Connect & Learn With Software Developers',
      'A community platform for software developers to connect over online events, channels, share knowledge & find jobs. Join now to build your "Developer Network".',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
    this.setSchema();
  }

  ngOnDestroy(): void {
    this.searchStatusService.setSearchStatus(true);
  }

  ngAfterViewInit(): void {
    if (this.isBrowserService.isBrowser()) {
      import('lottie-web').then((l) => {
        l.default.loadAnimation({
          container: this.homepageAnimationContainer.nativeElement,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'https://assets7.lottiefiles.com/packages/lf20_3lol1shu/json files/json file.json',
        });
      });
    }
  }

  getHomepageActions() {
    this.cmsService.getDataByType('homepageActions').subscribe((value: IHomepageAction[]) => {
      this.homepageActions = value.sort((a, b) => a.order - b.order);
    });
  }

  setSchema() {
    this.seoService.setSchema({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Commudle',
      alternateName: 'Commudle',
      url: 'https://www.commudle.com/',
      logo: 'https://www.commudle.com/assets/images/commudle-logo-full.png',
      sameAs: [
        'https://www.facebook.com/commudle',
        'https://twitter.com/commudle',
        'https://www.linkedin.com/company/commudle/',
        'https://github.com/commudle',
      ],
    });

    this.seoService.setSchema({
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: 'Commudle',
      image: 'https://www.commudle.com/assets/images/commudle-logo-full.png',
      description:
        'A community platform for software developers to connect over online events, channels, share knowledge & find jobs. Join now to build your Developer Network.',
      brand: {
        '@type': 'Brand',
        name: 'Commudle',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.63',
        bestRating: '4.9',
        worstRating: '4',
        ratingCount: '3',
        reviewCount: '3',
      },
      review: [
        {
          '@type': 'Review',
          name: 'Shilpa Garg',
          reviewBody:
            'From being a part of the Community team this was built for, to using it for all our events for WTM and GDG New Delhi for over 2 years, I personally think this is the platform all the developers and their communities in the world should be using.',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '4.6',
            bestRating: '4.9',
            worstRating: '4',
          },
          datePublished: '2022-06-14',
          author: { '@type': 'Person', name: 'Commudle' },
          publisher: { '@type': 'Organization', name: 'Commudle' },
        },
        {
          '@type': 'Review',
          name: 'Siddhant Agarwal',
          reviewBody:
            'I have seen the evolution of Commudle since inception when it was just a tool to seamlessly manage registrations to now using it as a tool for community building and much beyond. As Developer Relations Lead for Zwitch Developer Community, it has really helped us manage our community online, collaborate with other communities, publish labs and content which would be helpful for developers, track community metrics, etc. In short, Commudle acts as a one-stop solution for all our community building needs and scale the community further.',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '4.5',
            bestRating: '4.9',
            worstRating: '4',
          },
          datePublished: '2022-03-15',
          author: { '@type': 'Person', name: 'Commudle' },
          publisher: { '@type': 'Organization', name: 'Commudle' },
        },
        {
          '@type': 'Review',
          name: 'Daksh P. Jain',
          reviewBody:
            'Commudle is an amazing platform to connect with tech communities and it has a lot of potential. I have seen Commudle grow from its beginning and the improvement of Commudle has been exponential. I must admit that Arpan and his team are working really hard to improve the platform and I see a great future ahead for Commudle.',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '4.8',
            bestRating: '4.9',
            worstRating: '4',
          },
          datePublished: '2022-01-04',
          author: { '@type': 'Person', name: 'Commudle' },
          publisher: { '@type': 'Organization', name: 'Commudle' },
        },
      ],
    });
  }
}
