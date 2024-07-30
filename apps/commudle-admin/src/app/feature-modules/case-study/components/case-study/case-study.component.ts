import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsService } from 'apps/shared-services/cms.service';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';
import { ICaseStudy } from 'apps/shared-models/case-study.model';
import { SeoService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-case-study',
  templateUrl: './case-study.component.html',
  styleUrls: ['./case-study.component.scss'],
})
export class CaseStudyComponent implements OnInit, OnDestroy {
  caseStudyPage: ICaseStudy;
  richTextChallenges: string;
  richTextSolution: string;
  richTextStats: any[] = [];

  constructor(
    private cmsService: CmsService,
    private activatedRoute: ActivatedRoute,
    private footerService: FooterService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.footerService.changeFooterStatus(true);
    this.activatedRoute.params.subscribe((params) => {
      const slug = params.slug;
      this.getCaseStudyText(slug);
    });
  }

  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }

  getCaseStudyText(slug: string) {
    this.cmsService.getDataBySlug(slug).subscribe((data) => {
      this.caseStudyPage = data;
      this.richTextChallenges = this.cmsService.getHtmlFromBlock(data, 'challenge');
      this.richTextSolution = this.cmsService.getHtmlFromBlock(this.caseStudyPage.solution[0], 'solution');
      this.caseStudyPage.stats.forEach((stat) => {
        this.richTextStats.push(this.cmsService.getHtmlFromBlock(stat));
      });
      this.setMeta();
    });
  }

  setMeta(): void {
    this.seoService.setTags(
      `${this.caseStudyPage.title} - Case Study`,
      '${this.caseStudyPage.metaDescription}',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
