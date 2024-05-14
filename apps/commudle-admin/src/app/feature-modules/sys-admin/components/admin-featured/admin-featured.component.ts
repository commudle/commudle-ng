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
      route: ['./communities'],
    },
    {
      title: 'Featured Builds',
      // icon: 'paper-plane-outline',
      // responsive: true,
      route: ['./builds'],
    },
    {
      title: 'Featured Labs',
      route: ['./labs'],
    },
    {
      title: 'Featured Events',
      route: ['./events'],
    },
    {
      title: 'Featured Users',
      route: ['./featured-users'],
    },
    // {
    //   title: 'Featured channels',
    //   route: ['./featured-channels'],
    // },
  ];
  constructor() {}

  ngOnInit(): void {}
}
