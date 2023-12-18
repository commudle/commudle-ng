import { Component, Input, OnInit } from '@angular/core';
import { CmsService } from 'apps/shared-services/cms.service';

@Component({
  selector: 'commudle-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.scss'],
})
export class SearchDetailsComponent implements OnInit {
  // @Input() parentType: string;
  @Input() option: any;
  richText: string;

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    this.getHeaderText();
    // console.log(this.option);
  }

  getHeaderText() {
    // this.richText = this.cmsService.getHtmlFromBlock(this.option, 'about');
    console.log(this.richText);
  }
}
