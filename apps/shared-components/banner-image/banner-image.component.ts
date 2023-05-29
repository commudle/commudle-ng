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

  constructor() {}

  ngOnInit(): void {
    console.log(this.headerImagePath, this.name);
  }
}
