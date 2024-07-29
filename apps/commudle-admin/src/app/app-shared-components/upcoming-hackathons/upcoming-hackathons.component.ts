import { Component, OnInit } from '@angular/core';
import { environment } from '@commudle/shared-environments';
import { IHackathon } from '@commudle/shared-models';
import { SeoService } from '@commudle/shared-services';
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
  environment = environment;
  schemaForHackathon = [];

  constructor(private hackathonService: HackathonService, private seoService: SeoService) {}

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
        this.setSchema();
      }
    });
  }

  setSchema() {
    for (const upcomingHackathon of this.upcomingHackathons) {
      if (upcomingHackathon.start_date) {
        let location: object, hackathonStatus: string;
        if (upcomingHackathon.hackathon_location_type === 'offline') {
          location = {
            '@type': 'Place',
            name: upcomingHackathon.location_name,
            address: upcomingHackathon.location_address,
          };
          hackathonStatus = 'OfflineEventAttendanceMode';
        } else {
          location = {
            '@type': 'VirtualLocation',
            url:
              environment.app_url +
              '/communities/' +
              upcomingHackathon.kommunity_slug +
              '/hackathons/' +
              upcomingHackathon.slug,
          };
          hackathonStatus = 'OnlineEventAttendanceMode';
        }
        this.schemaForHackathon.push({
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: upcomingHackathon.name,
          description: upcomingHackathon.description.replace(/<[^>]*>/g, '').substring(0, 200),
          // image: upcomingHackathon.banner_image ? upcomingHackathon.banner_image.url : this.community.logo_path,
          startDate: upcomingHackathon.start_date,
          endDate: upcomingHackathon.end_date,
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/' + hackathonStatus,
          location: location,
          organizer: {
            '@type': 'Organization',
            name: upcomingHackathon.name,
            url: environment.app_url + '/communities/' + upcomingHackathon.kommunity_slug,
          },
        });
      }
    }
    this.seoService.setSchema(this.schemaForHackathon);
  }
}
