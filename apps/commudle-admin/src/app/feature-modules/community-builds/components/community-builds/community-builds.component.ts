import { Component, OnInit } from '@angular/core';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'app-community-builds',
  templateUrl: './community-builds.component.html',
  styleUrls: ['./community-builds.component.scss'],
})
export class CommunityBuildsComponent implements OnInit {
  isMobileView: boolean;
  constructor(private seoService: SeoService, private footerService: FooterService) {}

  ngOnInit() {
    this.footerService.changeFooterStatus(true);
    this.isMobileView = window.innerWidth <= 640;
    this.seoService.setTags(
      'Builds - Projects & Side Hustle Sharing Platform for Developers ',
      'Builds are open source and other projects in Web, Android, iOS, AI/ML & more created by software developers. Share a project to get recognition & inspire others.',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }

  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }
}
