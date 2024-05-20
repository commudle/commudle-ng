import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IListingPageHeader } from 'apps/shared-models/listing-page-header.model';
import { CmsService } from 'apps/shared-services/cms.service';

@Component({
  selector: 'commudle-case-study',
  templateUrl: './case-study.component.html',
  styleUrls: ['./case-study.component.scss'],
})
export class CaseStudyComponent implements OnInit {
  // caseStudyPageHeader: IListingPageHeader;
  caseStudyPageHeader;
  richTextChallenges: string;
  richTextSolution: string;
  richTextStats: any[] = [];

  constructor(private cmsService: CmsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const slug = params.slug;
      this.getHeaderText(slug);
    });
  }

  getHeaderText(slug: string) {
    this.cmsService.getDataBySlug(slug).subscribe((data) => {
      this.caseStudyPageHeader = data;
      this.richTextChallenges = this.cmsService.getHtmlFromBlock(data, 'challenge');
      this.richTextSolution = this.cmsService.getHtmlFromBlock(data, 'solution');
      this.caseStudyPageHeader.stats.forEach((stat) => {
        this.richTextStats.push(this.cmsService.getHtmlFromBlock(stat));
      });
    });
  }
}
