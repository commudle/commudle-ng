import { Component, Input, OnInit } from '@angular/core';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-public-page-stats',
  templateUrl: './public-page-stats.component.html',
  styleUrls: ['./public-page-stats.component.scss'],
})
export class PublicPageStatsComponent implements OnInit {
  @Input() stats: any[];
  faBolt = faBolt;
  constructor() {}

  ngOnInit(): void {}
}
