import { Component, OnInit } from '@angular/core';
import { NbRouteTab } from '@commudle/theme';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';

@Component({
  selector: 'commudle-public-home-list-speakers',
  templateUrl: './public-home-list-speakers.component.html',
  styleUrls: ['./public-home-list-speakers.component.scss'],
})
export class PublicHomeListSpeakersComponent implements OnInit {
  isMobileView: boolean;

  tabs: NbRouteTab[] = [
    {
      title: 'Speakers',
      route: './',
    },
    {
      title: 'Speaker Slides',
      route: ['./speaker-slides'],
    },
  ];

  constructor(private footerService: FooterService) {}

  ngOnInit(): void {
    this.footerService.changeFooterStatus(true);
    this.isMobileView = window.innerWidth <= 640;
  }

  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }
}
