import { Component, OnInit } from '@angular/core';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss'],
})
export class LabsComponent implements OnInit {
  isMobileView: boolean;

  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.isMobileView = window.innerWidth <= 640;
    this.seoService.setTags(
      'Guided Tutorials by Software Developers & Designers',
      'Labs are guided hands-on tutorials published by software developers. They teach you algorithms, help you create  apps & projects and cover topics including Web, Flutter, Android, iOS, Data Structures, ML & AI.',
      `https://commudle.com/assets/images/commudle-logo192.png`,
    );
  }
}
