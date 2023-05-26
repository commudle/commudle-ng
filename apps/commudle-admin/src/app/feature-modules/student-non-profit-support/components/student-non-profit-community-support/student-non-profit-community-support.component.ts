import { Component, OnInit } from '@angular/core';
import { SeoService } from 'apps/shared-services/seo.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';

@Component({
  selector: 'commudle-student-non-profit-community-support',
  templateUrl: './student-non-profit-community-support.component.html',
  styleUrls: ['./student-non-profit-community-support.component.scss'],
})
export class StudentNonProfitCommunitySupportComponent implements OnInit {
  faStar = faStar;
  constructor(private seoService: SeoService, private footerService: FooterService) {}

  ngOnInit(): void {
    this.footerService.changeFooterStatus(true);
    this.seoService.setTags(
      'Student & Non Profit Community Support',
      'Building a community on Commudle is free for students and non profits. All features including events, video stage, QR code, channels, member management, projects, tutorials and more are free',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }

  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }
}
