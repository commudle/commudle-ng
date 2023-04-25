import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'commudle-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss'],
})
export class CommunitiesComponent implements OnInit {
  tabs = [
    {
      route: './',
      title: 'Communities',
      icon: 'people',
    },
    {
      route: 'events',
      title: 'Events',
      icon: 'calendar',
    },
    {
      route: 'channels',
      title: 'Channels',
      icon: 'hash',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
