import { Component, OnInit, Input } from '@angular/core';
import { IEvent } from 'apps/shared-models/event.model';

@Component({
  selector: 'commudle-banner-image',
  templateUrl: './banner-image.component.html',
  styleUrls: ['./banner-image.component.scss'],
})
export class BannerImageComponent implements OnInit {
  @Input() headerImagePath;
  @Input() name;
  @Input() topRightCurve = true;
  @Input() bottomRightCurve = true;
  @Input() bottomLeftCurve = true;
  @Input() topLeftCurve = true;

  constructor() {}

  ngOnInit(): void {}
}
