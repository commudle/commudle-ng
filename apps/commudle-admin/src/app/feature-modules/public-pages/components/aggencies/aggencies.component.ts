import { Component, OnInit } from '@angular/core';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';

@Component({
  selector: 'commudle-aggencies',
  templateUrl: './aggencies.component.html',
  styleUrls: ['./aggencies.component.scss'],
})
export class AggenciesComponent implements OnInit {
  staticAssets = staticAssets;
  constructor() {}

  ngOnInit(): void {}
}
