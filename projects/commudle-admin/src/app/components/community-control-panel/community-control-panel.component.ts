import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-control-panel',
  templateUrl: './community-control-panel.component.html',
  styleUrls: ['./community-control-panel.component.scss']
})
export class CommunityControlPanelComponent implements OnInit {
  tabs: any[] = [
    {
      title: 'Events',
      route: './events',
    },
    {
      title: 'Forms',
      route: [ './forms' ],
    },
    {
      title: 'About',
      route: [ './about' ],
    },
    {
      title: 'Team',
      route: ['./team']
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
