import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';
import { IPrivacy } from 'apps/shared-models/privacy.model';
import { CmsService } from 'apps/shared-services/cms.service';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'commudle-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss'],
})
export class PoliciesComponent implements OnInit, OnDestroy {
  privacyPolicy: IPrivacy;
  content;

  constructor(
    private seoService: SeoService,
    private footerService: FooterService,
    private cmsService: CmsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.footerService.changeFooterStatus(true);
    this.getPolicyData();
  }

  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }
  getPolicyData() {
    this.cmsService.getDataBySlug(this.activatedRoute.snapshot.params.policy_slug).subscribe((value: IPrivacy) => {
      if (value) {
        this.privacyPolicy = value;
        this.seoService.setTitle(this.privacyPolicy.title);
        this.content = this.cmsService.getHtmlFromBlock(this.privacyPolicy);
      } else {
        this.router.navigate(['./404']);
      }
    });
  }
}
