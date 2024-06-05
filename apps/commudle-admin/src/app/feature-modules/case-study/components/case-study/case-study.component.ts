import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsService } from 'apps/shared-services/cms.service';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';
import { ICaseStudy } from 'apps/shared-models/case-study.model';

@Component({
  selector: 'commudle-case-study',
  templateUrl: './case-study.component.html',
  styleUrls: ['./case-study.component.scss'],
})
export class CaseStudyComponent implements OnInit, OnDestroy {
  caseStudyPageHeader: ICaseStudy;
  richTextChallenges: string;
  richTextSolution: string;
  solutionHeading: string;
  richTextStats: any[] = [];

  constructor(
    private cmsService: CmsService,
    private activatedRoute: ActivatedRoute,
    private footerService: FooterService,
  ) {}

  ngOnInit(): void {
    this.footerService.changeFooterStatus(true);
    this.activatedRoute.params.subscribe((params) => {
      const slug = params.slug;
      this.getHeaderText(slug);
    });
  }

  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }

  getHeaderText(slug: string) {
    this.cmsService.getDataBySlug(slug).subscribe((data) => {
      this.caseStudyPageHeader = data;
      this.richTextChallenges = this.cmsService.getHtmlFromBlock(data, 'challenge');
      this.richTextSolution = this.cmsService.getHtmlFromBlock(this.caseStudyPageHeader.solution[0], 'solution');
      this.solutionHeading = this.caseStudyPageHeader.solution[0].heading;
      this.caseStudyPageHeader.stats.forEach((stat) => {
        this.richTextStats.push(this.cmsService.getHtmlFromBlock(stat));
      });
    });
  }
}
