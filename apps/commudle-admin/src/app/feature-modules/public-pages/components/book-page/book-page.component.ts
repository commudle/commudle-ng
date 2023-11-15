import { Component, OnInit } from '@angular/core';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';

@Component({
  selector: 'commudle-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss'],
})
export class BookPageComponent implements OnInit {
  constructor() {}
  staticAssets = staticAssets;

  feature1 = {
    image: '',
    heading: 'Measure your performance',
    subheading: 'Stay connected with your team and make quick decisions wherever you are.',
  };

  feature2 = {
    image: '',
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

  ngOnInit(): void {
    console.log(this.feature1.heading);
  }
}
