import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faChartLine,
  faEarthAsia,
  faHandsHoldingCircle,
  faPeopleGroup,
  faSackDollar,
  faShapes,
  faStairs,
} from '@fortawesome/free-solid-svg-icons';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'commudle-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss'],
})
export class BookPageComponent implements OnInit, OnDestroy {
  constructor(private footerService: FooterService, private seoService: SeoService) {}

  staticAssets = staticAssets;
  faPeopleGroup = faPeopleGroup;
  faSackDollar = faSackDollar;
  faEarthAsia = faEarthAsia;
  faStairs = faStairs;
  faShapes = faShapes;
  faHandsHoldingCircle = faHandsHoldingCircle;
  faChartLine = faChartLine;

  feature1 = {
    icon: faPeopleGroup,
    heading: 'For DevRels, By DevRels',
    subheading: 'Get the perspective of Developer Relations professionals',
  };

  feature2 = {
    icon: faSackDollar,
    heading: 'Calculating ROI',
    subheading:
      'This is a big question and we have dedicated sections for generating a proposal with get you an ROI in the long term.',
  };

  feature3 = {
    icon: faEarthAsia,
    heading: 'Real World Examples',
    subheading: 'We have collected both successful and not so successful examples with a strong reasoning behind it.',
  };

  feature4 = {
    icon: faStairs,
    heading: 'Step By Step Actionables',
    subheading:
      'This is for you if you are an established enterprise with a running developer ecosystem or just starting out to build one.',
  };

  questions = [
    'Who is this handbook for?',
    'What is the authenticity of this book?',
    'Who has written this hand book?',
    'Will this book help me write a proposal or a business plan to build my developer communities?',
    'Is this book focused on ROI from developer communities?',
    'Will this book keep getting more updates? Can I contribute?',
  ];

  answers = [
    "This is a guide for any business which is selling to software developers. This includes devtools, developer platforms, edtech and blockchain domains. Communities are essential for your company's growth and this book tells you how to build them for a long term.",
    'This book has real examples collected from people who have built and scaled developer programs, communities and ecosystems globally. This includes leaders from some of the largest developer communities, startups, enterprises like Google, Microsoft, Amazon, Twilio, Github, LambdaTest, etc. For confidentiality reasons, we kept their names as private.',
    'This handbook is written by Arpan Garg, a founder at Commudle under the guidance of Shrinath V, a renowned product strategy expert. With support from Apra Sahney, Co-Founder at Commudle.',
    'Yes, we have also included a sample template for the same',
    'We help you decide the right ROI at the right stage in this book.',
    "Yes! That's why we are making it openly available for everyone. You can choose to download a pdf or read it on Commudle itself. To contribute, you can add examples or suggest edits by writing an email to arpan(at)commudle(dot)com.",
  ];

  ngOnInit(): void {
    this.footerService.changeFooterStatus(true);
    this.setMeta();
  }

  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }

  setMeta() {
    this.seoService.setTags(
      'The Developer Ecosystem Blueprint - Handbook',
      'Build a developer community ecosystem with this practical guide. Lessons from veteran developer relations and community leaders to build, sustain and scale up communities for your edtech, devtools, open source businesses.',
      staticAssets.devrel_ecosystem_blueprint,
    );
  }
}
