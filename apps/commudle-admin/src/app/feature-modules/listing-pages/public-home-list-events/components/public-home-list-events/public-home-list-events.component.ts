import { Component, OnInit } from '@angular/core';
import { SeoService } from 'apps/shared-services/seo.service';
@Component({
  selector: 'commudle-public-home-list-events',
  templateUrl: './public-home-list-events.component.html',
  styleUrls: ['./public-home-list-events.component.scss'],
})
export class PublicHomeListEventsComponent implements OnInit {
  isMobileView: boolean;
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 640;
    this.seoService.setTags(
      'Events - Online, Offline & Hybrid Events by Dev Communities',
      'Register and attend tech events on web development, devops, design, machine learning, AI, app development and more by developer communities. Find and network with tech experts.',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
