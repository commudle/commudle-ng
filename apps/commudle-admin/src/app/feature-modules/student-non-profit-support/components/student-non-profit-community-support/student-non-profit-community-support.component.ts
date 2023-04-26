import { Component, OnInit } from '@angular/core';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'commudle-student-non-profit-community-support',
  templateUrl: './student-non-profit-community-support.component.html',
  styleUrls: ['./student-non-profit-community-support.component.scss'],
})
export class StudentNonProfitCommunitySupportComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setTags(
      'Student & Non Profit Community Support',
      'Building a community on Commudle is free for students and non profits. All features including events, video stage, QR code, channels, member management, projects, tutorials and more are free',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
