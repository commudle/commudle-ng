import { Component, OnInit } from '@angular/core';
import { IListingPageHeader } from 'apps/shared-models/listing-page-header.model';
import { CmsService } from 'apps/shared-services/cms.service';

@Component({
  selector: 'commudle-case-study-taarangana',
  templateUrl: './case-study-taarangana.component.html',
  styleUrls: ['./case-study-taarangana.component.scss'],
})
export class CaseStudyTaaranganaComponent implements OnInit {
  // caseStudyPageHeader: IListingPageHeader;
  caseStudyPageHeader;
  richTextChallenges: string;
  richTextSolution: string;
  richTextStats: any[] = [];

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    this.getHeaderText();
  }

  getHeaderText() {
    this.cmsService.getDataBySlug('taarangana').subscribe((data) => {
      this.caseStudyPageHeader = data;
      this.richTextChallenges = this.cmsService.getHtmlFromBlock(data, 'challenge');
      this.richTextSolution = this.cmsService.getHtmlFromBlock(data, 'solution');
      this.caseStudyPageHeader.stats.forEach((stat) => {
        this.richTextStats.push(this.cmsService.getHtmlFromBlock(stat));
      });
    });
  }
}
