import { Component, OnInit } from '@angular/core';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';

@Component({
  selector: 'commudle-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss'],
})
export class BookPageComponent implements OnInit {
  constructor() {}
  staticAssets = staticAssets;
  faPencil = faPencil;

  feature1 = {
    icon: faPencil,
    heading: 'Measure your performance',
    subheading: 'Stay connected with your team and make quick decisions wherever you are.',
  };

  feature2 = {
    icon: faPencil,
    heading: 'Build your website',
    subheading: 'A tool that lets you build a dream website even if you know nothing about web design or programming.',
  };

  feature3 = {
    icon: faPencil,
    heading: 'Measure your performance',
    subheading: 'Stay connected with your team and make quick decisions wherever you are.',
  };

  feature4 = {
    icon: faPencil,
    heading: 'Build your website',
    subheading: 'A tool that lets you build a dream website even if you know nothing about web design or programming.',
  };

  testimonials: any[] = [
    {
      name: 'name1',
      username: 'username1',
      testimonialText: 'testimonial1',
      date: 'date1',
    },
    {
      name: 'name2',
      username: 'username1',
      testimonialText: 'testimonial1',
      date: 'date1',
    },
    {
      name: 'name3',
      username: 'username1',
      testimonialText: 'testimonial1',
      date: 'date1',
    },
    {
      name: 'name4',
      username: 'username1',
      testimonialText: 'testimonial1',
      date: 'date1',
    },
    {
      name: 'name5',
      username: 'username1',
      testimonialText: 'testimonial1',
      date: 'date1',
    },
    {
      name: 'name6',
      username: 'username1',
      testimonialText: 'testimonial1',
      date: 'date1',
    },
    {
      name: 'name7',
      username: 'username1',
      testimonialText: 'testimonial1',
      date: 'date1',
    },
    {
      name: 'name8',
      username: 'username1',
      testimonialText: 'testimonial1',
      date: 'date1',
    },
    {
      name: 'name9',
      username: 'username1',
      testimonialText: 'testimonial1',
      date: 'date1',
    },
  ];

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

  ngOnInit(): void {
    console.log(this.feature1.heading);
  }
}
