import { Component, OnDestroy, OnInit } from '@angular/core';
import { SeoService } from 'apps/shared-services/seo.service';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit, OnDestroy {
  constructor(private seoService: SeoService, private footerService: FooterService) {}

  ngOnInit() {
    this.footerService.changeFooterStatus(true);

    this.seoService.setTitle('Terms and Conditions');
  }
  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }
}
