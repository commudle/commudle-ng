import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-banner',
  templateUrl: './header-banner.component.html',
  styleUrls: ['./header-banner.component.scss']
})
export class HeaderBannerComponent implements OnInit {

  trending = [];
  // trending = [
  //   {
  //     name: 'Game theory using Regression',
  //     image: '',
  //     description: '',
  //     type: 'Upcoming Event',
  //     stats: {
  //       icon: 'trending-up',
  //       text: '200 going'
  //     }
  //   },
  //   {
  //     name: 'Game theory using Regression',
  //     image: '',
  //     description: '',
  //     type: 'New Lab',
  //     stats: {
  //       icon: 'eye',
  //       text: '200 views'
  //     }
  //   },
  //   {
  //     name: 'This is CSS Week!',
  //     image: 'https://via.placeholder.com/100',
  //     description: 'Write a lab and we will get it reviewed by "expert-name". If published, you win a T Shirt!',
  //     type: '',
  //     stats: {
  //       icon: 'flash',
  //       text: '20 left'
  //     }
  //   },
  //   {
  //     name: '',
  //     image: '',
  //     description: 'What\'s the one new thing in software development you learnt in the last month, write a lab and win a TShirt!',
  //     type: 'New Goodies',
  //     stats: {
  //       icon: '',
  //       text: ''
  //     }
  //   },
  // ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
