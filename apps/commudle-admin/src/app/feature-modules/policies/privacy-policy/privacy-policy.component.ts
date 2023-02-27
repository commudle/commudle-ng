import { Component, OnDestroy, OnInit } from '@angular/core';
import { SeoService } from 'apps/shared-services/seo.service';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {
  constructor(private seoService: SeoService, private footerService: FooterService) {}

  ngOnInit() {
    this.footerService.changeFooterStatus(true);
    this.seoService.setTitle('Privacy Policy');
  }

  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }
}
