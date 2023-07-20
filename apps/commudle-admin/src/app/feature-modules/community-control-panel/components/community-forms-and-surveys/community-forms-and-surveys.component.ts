import { Component, OnInit } from '@angular/core';
import { NbRouteTab } from '@commudle/theme';

@Component({
  selector: 'commudle-community-forms-and-surveys',
  templateUrl: './community-forms-and-surveys.component.html',
  styleUrls: ['./community-forms-and-surveys.component.scss'],
})
export class CommunityFormsAndSurveysComponent implements OnInit {
  tabs: NbRouteTab[] = [
    {
      title: 'Forms',
      route: './',
    },
    {
      title: 'Surveys',
      route: ['./surveys'],
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
