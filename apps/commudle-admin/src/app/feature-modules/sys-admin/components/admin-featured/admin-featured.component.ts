import { Component, OnInit } from '@angular/core';
import { NbRouteTab } from '@commudle/theme';

@Component({
  selector: 'commudle-admin-featured',
  templateUrl: './admin-featured.component.html',
  styleUrls: ['./admin-featured.component.scss'],
})
export class AdminFeaturedComponent implements OnInit {
  tabs: NbRouteTab[] = [
    {
      title: 'Featured Communities',
      // icon: 'person',
      route: './',
    },
    {
      title: 'Featured Builds',
      // icon: 'paper-plane-outline',
      // responsive: true,
      route: ['./featured-builds'],
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
