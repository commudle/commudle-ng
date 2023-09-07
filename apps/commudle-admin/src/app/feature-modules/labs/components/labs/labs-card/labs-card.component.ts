import { Component, Input, OnInit } from '@angular/core';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { ILab } from 'apps/shared-models/lab.model';

@Component({
  selector: 'app-labs-card',
  templateUrl: './labs-card.component.html',
  styleUrls: ['./labs-card.component.scss'],
})
export class LabsCardComponent implements OnInit {
  @Input() lab: ILab;
  staticAssets = staticAssets;

  constructor() {}

  ngOnInit(): void {}
}
