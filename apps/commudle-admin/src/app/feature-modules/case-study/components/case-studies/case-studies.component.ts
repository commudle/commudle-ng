import { Component, OnInit } from '@angular/core';
import { CmsService } from 'apps/shared-services/cms.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';

@Component({
  selector: 'commudle-case-studies',
  templateUrl: './case-studies.component.html',
  styleUrls: ['./case-studies.component.scss'],
})
export class CaseStudiesComponent implements OnInit {
  caseStudies: any[] = [];
  isLoading = true;

  constructor(private cmsService: CmsService, private seoService: SeoService, private footerService: FooterService) {}

  ngOnInit(): void {
    this.footerService.changeFooterStatus(true);
    this.getCaseStudies();
    this.setMeta();
  }

  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }

  getCaseStudies() {
    const fields = 'title, tagline, slug, bannerImage';
    this.cmsService.getDataByTypeFieldOrder('caseStudy', fields).subscribe((value) => {
      this.caseStudies = value;
      this.isLoading = false;
    });
  }

  setMeta(): void {
    // this.seoService.setTags(
    //   'Relating with Developers & Communities',
    //   'Blogs in the form of experiences and knowledge, authored by Developers, Designers, Community Managers and DevRels',
    //   'https://commudle.com/assets/images/commudle-logo192.png',
    // );
  }
}
