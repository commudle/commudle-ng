import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  cardContent = [
    {
      title: 'Lonavla',
      subtitle: '66 kilometers away',
      image: 'https://a0.muscache.com/im/pictures/1cdb5298-1e10-4d5a-ac27-20c80b53b4af.jpg',
    },
    {
      title: 'Calangute',
      subtitle: '396 kilometers away',
      image: 'https://a0.muscache.com/im/pictures/0538dab4-a0fc-4035-b6b2-40fa3532ee7b.jpg',
    },
    {
      title: 'Nashik',
      subtitle: '151 kilometers away',
      image: 'https://a0.muscache.com/im/pictures/f73eff6c-cffd-4462-a2bf-9417f5d2fbe9.jpg',
    },
    {
      title: 'Panchgani',
      subtitle: '156 kilometers away',
      image: 'https://a0.muscache.com/im/pictures/3a7b8005-28b8-48b8-8efa-0a6a00f7d5d8.jpg',
    },
  ];
  bannerContent = [
    {
      title: 'Things to do\non your trip',
      buttonText: 'Experiences',
      image: 'https://a0.muscache.com/im/pictures/b2f98185-f3bf-40db-ba8d-da0bceeccc65.jpg',
      type: 'primary',
    },
    {
      title: 'Things to do\nfrom home',
      buttonText: 'Online Experiences',
      image: 'https://a0.muscache.com/im/pictures/cae7ae9a-d069-4c6a-9267-795643472df1.jpg',
      type: 'primary',
    },
    {
      title: 'Questions\nabout\nhosting?',
      buttonText: 'Ask a Superhost',
      image: 'https://a0.muscache.com/im/pictures/cca24f3f-8f66-4e9d-98d8-dd5cda8911eb.jpg',
      type: 'secondary',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
