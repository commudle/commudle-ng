import { Component, OnInit } from '@angular/core';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'commudle-public-home-list-experts',
  templateUrl: './public-home-list-experts.component.html',
  styleUrls: ['./public-home-list-experts.component.scss'],
})
export class PublicHomeListExpertsComponent implements OnInit {
  isMobileView: boolean;
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 640;
    this.setMeta();
  }

  setMeta(): void {
    this.seoService.setTags(
      'Experts on Commudle',
      'Find experts in AI, Web, Design, Cloud, A11Y, Android, iOS, Flutter and so many more technologies. Nominate yourself to be an expert and build a strong network, connect with an expert to get guidance',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
