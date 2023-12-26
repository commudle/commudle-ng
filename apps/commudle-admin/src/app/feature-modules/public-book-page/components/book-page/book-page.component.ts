import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'commudle-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss'],
})
export class BookPageComponent implements OnInit {
  constructor(private footerService: FooterService) {}

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
    'Do I need to purchase any other platform when I setup a Community on Commudle?',
    'How many Communities can I host on Commudle?',
    "I'm looking to build a career in DevRel, how can Commudle be useful in that?",
    'I want to display activities from Commudle on my website, is it possible?',
    'Will you help me migrate from other platforms?',
    'I lead a Design Community, is Commudle for me?',
  ];

  answers = [
    "We don't think so, the Developer Communities on Commudle are able to manage all their activities here.",
    "You can host your complete Developer Ecosystem with 100's of Communities on Commudle. We have an organization page too. You have access to all the data and stats you need.",
    "As a DevRel, it's important to have an experience of building and growing your own Developer Community. Some folks are at leading DevRel positions who started by building their own Community here.",
    "Yes! From Startup plan and upwards you get access to our API's which can be used to display summary of your communities' activities on your own web page.",
    "Yes! And it's very easy.",
    'Absolutely, a few Design Communities are already using Commudle.',
  ];

  ngOnInit(): void {
    this.footerService.changeFooterStatus(true);
  }

  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }
}
