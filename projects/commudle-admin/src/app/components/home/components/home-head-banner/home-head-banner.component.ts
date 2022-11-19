import { Component, OnInit } from '@angular/core';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { staticAssets } from 'projects/commudle-admin/src/assets/static-assets';

@Component({
  selector: 'app-home-head-banner',
  templateUrl: './home-head-banner.component.html',
  styleUrls: ['./home-head-banner.component.scss'],
})
export class HomeHeadBannerComponent implements OnInit {
  faFlask = faFlask;
  staticAssets = staticAssets;

  constructor() {}

  ngOnInit(): void {}
}
