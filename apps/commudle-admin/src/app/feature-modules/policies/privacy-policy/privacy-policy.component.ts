import { Component, OnDestroy, OnInit } from '@angular/core';
import { SeoService } from 'apps/shared-services/seo.service';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';
import { CmsService } from 'apps/shared-services/cms.service';
import { IPrivacy } from 'apps/shared-models/privacy.model';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {
  privacyPolicy: IPrivacy;
  content;
  constructor(private seoService: SeoService, private footerService: FooterService, private cmsService: CmsService) {}

  ngOnInit() {
    this.footerService.changeFooterStatus(true);
    this.seoService.setTitle('Privacy Policy');

    this.cmsService.getDataBySlug('privacy-policy-for-commudle').subscribe((value: IPrivacy) => {
      this.privacyPolicy = value;
      this.content = this.cmsService.getHtmlFromBlock(value);
    });
  }

  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }
}
