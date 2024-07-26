import { Component, OnInit } from '@angular/core';
import { IHackathon } from '@commudle/shared-models';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IPageInfo } from 'apps/shared-models/page-info.model';

@Component({
  selector: 'commudle-upcoming-hackathons',
  templateUrl: './upcoming-hackathons.component.html',
  styleUrls: ['./upcoming-hackathons.component.scss'],
})
export class UpcomingHackathonsComponent implements OnInit {
  upcomingHackathons = [];
  showSpinner = false;
  pageInfo: IPageInfo;
  total: number;
  limit = 5;
  page_info: IPageInfo;

  constructor(private hackathonService: HackathonService) {}

  ngOnInit(): void {
    this.getUpcomingHackathons();
  }

  getUpcomingHackathons() {
    this.showSpinner = true;
    this.hackathonService.pGetUpcomingHackathon('future', this.limit, this.pageInfo?.end_cursor).subscribe((data) => {
      if (data) {
        this.upcomingHackathons = this.upcomingHackathons.concat(
          data.page.reduce((acc, value) => [...acc, value.data], []),
        );
        this.total = data.total;
        this.pageInfo = data.page_info;
        this.showSpinner = false;
      }
    });
  }
}
