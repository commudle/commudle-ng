import { Component, OnInit } from '@angular/core';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';

@Component({
  selector: 'commudle-experts-program',
  templateUrl: './experts-program.component.html',
  styleUrls: ['./experts-program.component.scss'],
})
export class ExpertsProgramComponent implements OnInit {
  staticAssets = staticAssets;
  constructor() {}

  ngOnInit(): void {}
}
