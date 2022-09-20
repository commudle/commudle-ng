import { Component, Input, OnInit } from '@angular/core';
import { IEmailStatsOverview } from '@commudle/shared-models';
import { MainNewslettersService } from '../../services/main-newsletters.service';

@Component({
  selector: 'commudle-main-newsletter-email-stats',
  templateUrl: './main-newsletter-email-stats.component.html',
  styleUrls: ['./main-newsletter-email-stats.component.scss']
})
export class MainNewsletterEmailStatsComponent implements OnInit {
  @Input() mainNewsletterId: number;
  emailStats: IEmailStatsOverview;
  constructor(
    private mainNewslettersService: MainNewslettersService
  ) { }

  ngOnInit(): void {
    this.getStats();
  }

  getStats() {
    this.mainNewslettersService.emailStats(this.mainNewsletterId).subscribe(
      data => this.emailStats = data
    );
  }

}
