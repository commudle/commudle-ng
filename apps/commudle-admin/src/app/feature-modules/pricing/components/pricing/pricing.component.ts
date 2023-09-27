import { Component, OnDestroy, OnInit } from '@angular/core';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit, OnDestroy {
  staticAssets = staticAssets;
  isMobileView = false;
  logoCloud: { image: string; name: string; slug: string; description: string }[] = [
    {
      name: 'GDG New Delhi',
      slug: 'gdg-new-delhi',
      description: 'The largest Tech Community on Commudle consists of Software Developers',
      image:
        'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbmNlIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1931d8ac25e32d52949f7069bfa3ceaf01db6524/gdg_new_delhi.png',
    },
    {
      name: 'Women Who Code Delhi',
      slug: 'women-who-code-delhi',
      description: 'WWC is the largest and most active community of engineers for inspiring women',
      image:
        'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbmdlIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0eea224f77b91c395fe673164ee631209119061b/women_who_code_delhi.jpg',
    },
    // {
    //   name: '#VoiceFirst India',
    //   slug: 'voicefirst',
    //   description: '',
    //   image:
    //     'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbmtlIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--91fa65611243731b0634dde7543ce281bc0efcc0/voice_first_india.png',
    // },
    {
      name: 'AWS User Group Punjab',
      slug: 'aws-user-group-punjab',
      description: 'We are a comprehensive, continuously evolving cloud computing platform',
      image:
        'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbm9lIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--eb88ade542fb4c46b4e706041a558052b04e4221/aws_user_group_punjab.png',
    },
    {
      name: 'Aeologic - Building Innovators',
      slug: 'aeologic-building-innovators',
      description: 'Aeologic - Building Innovators is an initiative to promote responsible innovation',
      image:
        'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbnNlIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5bcee4c04c89e3a69bc3cf14341b272d746fd560/aeologic.png',
    },
    // {
    //   name: 'CodeChef SRM Chennai',
    //   slug: 'codechef-srm-chennai',
    //   description: '',
    //   image:
    //     'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbndlIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d397a7bbae81d16d5da6e8a7574573d7ad90602b/codechef_srm_chennai.png',
    // },
    {
      name: 'Code Warriors',
      slug: 'code-warriors',
      description: 'We are a community with a mission to improve people’s lives through learning',
      image:
        'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ1VmIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cabf8b38a9a79bb33d3163c4f9cda70a85e19e47/code_warriors.png',
    },
    {
      name: 'CDN Commudle Developer Network',
      slug: 'cdn-commudle-developer-network',
      description: 'A community for software developers to help each other upskill',
      image:
        'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ1lmIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d1aab5e1bd61349d5582ec309b13ea60f75dbfa3/cdn_commudle_developer_network.png',
    },
    // {
    //   name: 'CDN Commudle Developer Network',
    //   slug: 'cdn-commudle-developer-network',
    //   description: 'A community for software developers to help each other upskill',
    //   image:
    //     'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ1lmIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d1aab5e1bd61349d5582ec309b13ea60f75dbfa3/cdn_commudle_developer_network.png',
    // },
  ];

  answers = [
    "We don't think so, the Developer Communities on Commudle are able to manage all their activities here.",
    "You can host your complete Developer Ecosystem with 100's of Communities on Commudle. We have an organization page too. You have access to all the data and stats you need.",
    "As a DevRel, it's important to have an experience of building and growing your own Developer Community. Some folks are at leading DevRel positions who started by building their own Community here.",
    "Yes! From Startup plan and upwards you get access to our API's which can be used to display summary of your communities' activities on your own web page.",
    "Yes! And it's very easy.",
    'Absolutely, a few Design Communities are already using Commudle.',
    'Yes, Commudle supports paid ticket events',
  ];

  constructor(
    private seoService: SeoService,
    private gtm: GoogleTagManagerService,
    private footerService: FooterService,
  ) {}

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 1024;
    this.footerService.changeFooterStatus(true);
    this.seoService.setTags(
      'Pricing: Students, DevRels, Startups',
      'Host all your developer community activities from events, member profiles, 1:1 communications, forums, channels and more, all at one place on Commudle',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }

  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }

  gtmDatalayerPush(event) {
    this.gtm.dataLayerPushEvent('click-pricing-plan', { com_plan_type: event });
  }

  getUseCaseCardsUrl() {
    if (this.isMobileView) {
      return "url('" + staticAssets.pricing_usecase_cards_mobile + "')";
    } else {
      return "url('" + staticAssets.pricing_usecase_cards_desktop + "')";
    }
  }

  getCommunityLogoCardsUrl() {
    if (this.isMobileView) {
      return "url('" + staticAssets.pricing_community_logo_mobile + "')";
    } else {
      return "url('" + staticAssets.pricing_community_logo_desktop + "')";
    }
  }
}
