import { Component, OnInit } from '@angular/core';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'app-community-builds',
  templateUrl: './community-builds.component.html',
  styleUrls: ['./community-builds.component.scss'],
})
export class CommunityBuildsComponent implements OnInit {
  isMobileView: boolean;
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.isMobileView = window.innerWidth <= 640;
    window.addEventListener('resize', () => {
      this.isMobileView = window.innerWidth <= 640;
    });
    this.seoService.setTags(
      'Builds - Projects & Side Hustle Sharing Platform for Developers ',
      'Builds are open source and other projects in Web, Android, iOS, AI/ML & more created by software developers. Share a project to get recognition & inspire others.',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
