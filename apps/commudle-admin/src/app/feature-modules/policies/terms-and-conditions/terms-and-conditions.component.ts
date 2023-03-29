import { Component, OnDestroy, OnInit } from '@angular/core';
import { SeoService } from 'apps/shared-services/seo.service';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';
import { CmsService } from 'apps/shared-services/cms.service';
import { IPrivacy } from 'apps/shared-models/privacy.model';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit, OnDestroy {
  termsAndCondition: IPrivacy;
  content;
  constructor(private seoService: SeoService, private footerService: FooterService, private cmsService: CmsService) {}

  ngOnInit() {
    this.footerService.changeFooterStatus(true);

    this.seoService.setTitle('Terms and Conditions');

    this.cmsService.getDataBySlug('terms-and-conditions').subscribe((value: IPrivacy) => {
      this.termsAndCondition = value;
      this.content = this.cmsService.getHtmlFromBlock(value);
    });
  }
  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }
}
