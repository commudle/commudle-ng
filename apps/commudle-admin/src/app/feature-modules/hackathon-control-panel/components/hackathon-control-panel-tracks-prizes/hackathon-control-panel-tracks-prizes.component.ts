import { Component, OnInit } from '@angular/core';
import { NbRouteTab } from '@commudle/theme';

@Component({
  selector: 'commudle-hackathon-control-panel-tracks-prizes',
  templateUrl: './hackathon-control-panel-tracks-prizes.component.html',
  styleUrls: ['./hackathon-control-panel-tracks-prizes.component.scss'],
})
export class HackathonControlPanelTracksPrizesComponent implements OnInit {
  tabs: NbRouteTab[] = [
    {
      title: 'Tracks',
      route: './',
    },
    {
      title: 'prizes',
      route: ['./prizes'],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
