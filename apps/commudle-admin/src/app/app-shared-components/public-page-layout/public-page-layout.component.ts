import { Component, Input, OnInit } from '@angular/core';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';

@Component({
  selector: 'commudle-public-page-layout',
  templateUrl: './public-page-layout.component.html',
  styleUrls: ['./public-page-layout.component.scss'],
})
export class PublicPageLayoutComponent implements OnInit {
  @Input() imageOnLeft = false;
  constructor() {}

  ngOnInit(): void {}
}
