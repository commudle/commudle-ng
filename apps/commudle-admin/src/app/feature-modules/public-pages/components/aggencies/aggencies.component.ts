import { Component, OnInit } from '@angular/core';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';

@Component({
  selector: 'commudle-aggencies',
  templateUrl: './aggencies.component.html',
  styleUrls: ['./aggencies.component.scss'],
})
export class AggenciesComponent implements OnInit {
  staticAssets = staticAssets;
  stats: any[] = [
    {
      number: 1,
      name: 'name1',
      description: 'description1',
    },
    {
      number: 2,
      name: 'name2',
      description: 'description2',
    },
    {
      number: 3,
      name: 'name3',
      description: 'description3',
    },
  ];

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

  constructor() {}

  ngOnInit(): void {}
}
