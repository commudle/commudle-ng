import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'commudle-public-page-stats',
  templateUrl: './public-page-stats.component.html',
  styleUrls: ['./public-page-stats.component.scss'],
})
export class PublicPageStatsComponent implements OnInit {
  @Input() stats: any[];
  constructor() {}

  ngOnInit(): void {}
}
